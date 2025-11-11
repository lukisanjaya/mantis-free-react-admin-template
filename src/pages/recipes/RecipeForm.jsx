import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Grid
} from '@mui/material';
import { ArrowLeftOutlined, SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useGetRecipeById } from 'api/recipes';

const validationSchema = Yup.object({
  name: Yup.string().required('Nama resep wajib diisi'),
  image: Yup.string().url('URL gambar tidak valid').required('URL gambar wajib diisi'),
  prepTimeMinutes: Yup.number().min(0, 'Prep time harus positif').required('Prep time wajib diisi'),
  cookTimeMinutes: Yup.number().min(0, 'Cook time harus positif').required('Cook time wajib diisi'),
  servings: Yup.number().min(1, 'Minimal 1 porsi').required('Servings wajib diisi'),
  difficulty: Yup.string().required('Difficulty wajib diisi'),
  cuisine: Yup.string().required('Cuisine wajib diisi'),
  caloriesPerServing: Yup.number().min(0, 'Calories harus positif'),
  rating: Yup.number().min(0, 'Rating minimal 0').max(5, 'Rating maksimal 5')
});

export default function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { recipe, isLoading, error } = useGetRecipeById(isEditMode ? id : null);

  const formik = useFormik({
    initialValues: recipe ? {
      name: recipe.name || '',
      image: recipe.image || '',
      prepTimeMinutes: recipe.prepTimeMinutes || 0,
      cookTimeMinutes: recipe.cookTimeMinutes || 0,
      servings: recipe.servings || 1,
      difficulty: recipe.difficulty || 'Easy',
      cuisine: recipe.cuisine || '',
      caloriesPerServing: recipe.caloriesPerServing || 0,
      rating: recipe.rating || 0,
      tags: recipe.tags || [],
      mealType: recipe.mealType || []
    } : {
      name: '',
      image: '',
      prepTimeMinutes: 0,
      cookTimeMinutes: 0,
      servings: 1,
      difficulty: 'Easy',
      cuisine: '',
      caloriesPerServing: 0,
      rating: 0,
      tags: [],
      mealType: []
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          alert(`Update resep "${values.name}" akan diproses`);
        } else {
          alert(`Create resep baru "${values.name}" akan diproses`);
        }
        // TODO: Implementasikan API call ke backend
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  });

  if (isEditMode && isLoading) {
    return (
      <MainCard>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  if (isEditMode && error) {
    return (
      <MainCard>
        <Alert severity="error">Gagal memuat resep untuk diedit</Alert>
      </MainCard>
    );
  }

  return (
    <MainCard>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          {isEditMode ? 'Edit Resep' : 'Create Resep Baru'}
        </Typography>
        <Button
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate('/recipes/view')}
          variant="text"
        >
          Cancel
        </Button>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
          {/* Nama */}
          <TextField
            fullWidth
            label="Nama Resep"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* Image URL */}
          <TextField
            fullWidth
            label="URL Gambar"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.image && !!formik.errors.image}
            helperText={formik.touched.image && formik.errors.image}
          />

          {/* Preview Gambar */}
          {formik.values.image && (
            <Box
              component="img"
              src={formik.values.image}
              alt="Preview"
              sx={{ maxWidth: '100%', maxHeight: 200, borderRadius: 1 }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          {/* Grid 2 kolom */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Prep Time (menit)"
                name="prepTimeMinutes"
                type="number"
                value={formik.values.prepTimeMinutes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.prepTimeMinutes && !!formik.errors.prepTimeMinutes}
                helperText={formik.touched.prepTimeMinutes && formik.errors.prepTimeMinutes}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Cook Time (menit)"
                name="cookTimeMinutes"
                type="number"
                value={formik.values.cookTimeMinutes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cookTimeMinutes && !!formik.errors.cookTimeMinutes}
                helperText={formik.touched.cookTimeMinutes && formik.errors.cookTimeMinutes}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Servings"
                name="servings"
                type="number"
                value={formik.values.servings}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.servings && !!formik.errors.servings}
                helperText={formik.touched.servings && formik.errors.servings}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Calories Per Serving"
                name="caloriesPerServing"
                type="number"
                value={formik.values.caloriesPerServing}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.caloriesPerServing && !!formik.errors.caloriesPerServing}
                helperText={formik.touched.caloriesPerServing && formik.errors.caloriesPerServing}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Difficulty"
                name="difficulty"
                select
                SelectProps={{ native: true }}
                value={formik.values.difficulty}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.difficulty && !!formik.errors.difficulty}
                helperText={formik.touched.difficulty && formik.errors.difficulty}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Cuisine"
                name="cuisine"
                value={formik.values.cuisine}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cuisine && !!formik.errors.cuisine}
                helperText={formik.touched.cuisine && formik.errors.cuisine}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Rating (0-5)"
            name="rating"
            type="number"
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rating && !!formik.errors.rating}
            helperText={formik.touched.rating && formik.errors.rating}
          />

          {/* Submit Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveOutlined />}
              type="submit"
              sx={{ textTransform: 'none' }}
            >
              {isEditMode ? 'Update Resep' : 'Create Resep'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/recipes/view')}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </MainCard>
  );
}
