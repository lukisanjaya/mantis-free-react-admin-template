import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Divider,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { ArrowLeftOutlined, ClockCircleOutlined, FireOutlined, TeamOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useGetRecipeById } from 'api/recipes';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipe, isLoading, error } = useGetRecipeById(id);

  if (isLoading) {
    return (
      <MainCard>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  if (error || !recipe) {
    return (
      <MainCard>
        <Alert severity="error">Gagal memuat detail resep</Alert>
      </MainCard>
    );
  }

  return (
    <MainCard>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowLeftOutlined />}
          onClick={() => navigate('/recipes/view')}
          variant="text"
        >
          Kembali ke Daftar
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditOutlined />}
            onClick={() => navigate(`/recipes/edit/${id}`)}
            sx={{ textTransform: 'none' }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteOutlined />}
            onClick={() => alert('Delete resep akan datang')}
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Gambar */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              image={recipe.image}
              alt={recipe.name}
              sx={{ height: 300, objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        {/* Info Utama */}
        <Grid item xs={12} md={7}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {recipe.name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {recipe.tags && recipe.tags.map((tag) => (
              <Chip key={tag} label={tag} variant="outlined" color="primary" />
            ))}
            <Chip label={recipe.difficulty} color="info" />
            <Chip label={recipe.cuisine} color="success" />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Info Grid */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Prep Time
                </Typography>
                <Typography variant="h6">
                  {recipe.prepTimeMinutes} min
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Cook Time
                </Typography>
                <Typography variant="h6">
                  {recipe.cookTimeMinutes} min
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <TeamOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Servings
                </Typography>
                <Typography variant="h6">
                  {recipe.servings}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: 'center' }}>
                <FireOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Calories
                </Typography>
                <Typography variant="h6">
                  {recipe.caloriesPerServing}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Rating: {recipe.rating} ⭐ ({recipe.reviewCount} reviews)
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Ingredients */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Ingredients
        </Typography>
        <List>
          {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={ingredient} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Instructions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Instructions
        </Typography>
        <List>
          {recipe.instructions && recipe.instructions.map((instruction, idx) => (
            <ListItem key={idx} sx={{ alignItems: 'flex-start' }}>
              <ListItemIcon>
                <Typography sx={{ fontWeight: 'bold', minWidth: 30 }}>
                  {idx + 1}.
                </Typography>
              </ListItemIcon>
              <ListItemText primary={instruction} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Meal Type */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          Meal Type
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {recipe.mealType && recipe.mealType.map((meal) => (
            <Chip key={meal} label={meal} color="warning" />
          ))}
        </Box>
      </Box>
    </MainCard>
  );
}
