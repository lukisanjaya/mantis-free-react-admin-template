import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Material-UI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

// Icons
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

// Components
import MainCard from 'components/MainCard';

// API
import { useGetProductById, useGetCategories, addProduct, updateProduct } from 'api/products';

// Helper function to safely convert values to strings
const safeString = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    if (value.name) return value.name;
    if (value.slug) return value.slug;
    return '';
  }
  return String(value);
};

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required('Nama produk wajib diisi').min(3, 'Minimal 3 karakter'),
  description: Yup.string().required('Deskripsi wajib diisi').min(10, 'Minimal 10 karakter'),
  price: Yup.number().required('Harga wajib diisi').positive('Harga harus positif'),
  category: Yup.string().required('Kategori wajib dipilih'),
  stock: Yup.number().required('Stock wajib diisi').positive('Stock harus positif').integer(),
  rating: Yup.number().min(0, 'Rating minimal 0').max(5, 'Rating maksimal 5')
});

// ==============================|| PRODUCT FORM ||============================== //

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Get existing product data
  const { product: existingProduct, isLoading: isLoadingProduct } = useGetProductById(id);
  const { categories } = useGetCategories();

  const isEditMode = !!id;

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      rating: 0,
      thumbnail: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (isEditMode) {
          await updateProduct(id, values);
          setAlert({ severity: 'success', message: 'Produk berhasil diperbarui!' });
        } else {
          await addProduct(values);
          setAlert({ severity: 'success', message: 'Produk berhasil ditambahkan!' });
        }

        setTimeout(() => {
          navigate('/products/all');
        }, 1500);
      } catch (error) {
        setAlert({ severity: 'error', message: 'Gagal menyimpan produk: ' + error.message });
        setLoading(false);
      }
    }
  });

  // Populate form dengan data existing product
  useEffect(() => {
    if (existingProduct && isEditMode) {
      formik.setValues({
        title: safeString(existingProduct.title),
        description: safeString(existingProduct.description),
        price: existingProduct.price || '',
        category: safeString(existingProduct.category),
        stock: existingProduct.stock || '',
        rating: existingProduct.rating || 0,
        thumbnail: safeString(existingProduct.thumbnail)
      });
    }
  }, [existingProduct, isEditMode]);

  if (isEditMode && isLoadingProduct) {
    return (
      <MainCard>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  return (
    <MainCard>
      <CardHeader
        title={isEditMode ? 'Edit Produk' : 'Tambah Produk Baru'}
        subheader={isEditMode ? `Edit produk #${id}` : 'Buat produk baru'}
        action={
          <Button
            variant="outlined"
            startIcon={<ArrowLeftOutlined />}
            onClick={() => navigate('/products/all')}
            size="small"
          >
            Kembali
          </Button>
        }
      />
      <Divider sx={{ my: 2 }} />

      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5, maxWidth: 600 }}>
          {/* Nama Produk */}
          <TextField
            fullWidth
            label="Nama Produk *"
            name="title"
            placeholder="Masukkan nama produk"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
            variant="outlined"
          />

          {/* Kategori */}
          <FormControl fullWidth error={formik.touched.category && !!formik.errors.category}>
            <InputLabel>Kategori *</InputLabel>
            <Select
              name="category"
              label="Kategori *"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="">
                <em>Pilih Kategori</em>
              </MenuItem>
              {categories.map((cat) => {
                const catName = typeof cat === 'string' ? cat : (cat.name || cat.slug || cat);
                const catKey = typeof cat === 'string' ? cat : (cat.slug || cat.name || cat);
                return (
                  <MenuItem key={catKey} value={catName}>
                    {catName}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.touched.category && formik.errors.category && (
              <Box sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: 0.5 }}>{formik.errors.category}</Box>
            )}
          </FormControl>

          {/* Deskripsi */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Deskripsi Produk *"
            name="description"
            placeholder="Masukkan deskripsi produk..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
            variant="outlined"
          />

          {/* Harga */}
          <TextField
            fullWidth
            type="number"
            label="Harga (USD) *"
            name="price"
            placeholder="0.00"
            inputProps={{ step: '0.01', min: '0' }}
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && !!formik.errors.price}
            helperText={formik.touched.price && formik.errors.price}
            variant="outlined"
          />

          {/* Stock */}
          <TextField
            fullWidth
            type="number"
            label="Stock *"
            name="stock"
            placeholder="0"
            inputProps={{ min: '0' }}
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.stock && !!formik.errors.stock}
            helperText={formik.touched.stock && formik.errors.stock}
            variant="outlined"
          />

          {/* Rating */}
          <TextField
            fullWidth
            type="number"
            label="Rating (0 - 5)"
            name="rating"
            placeholder="3.5"
            inputProps={{ min: '0', max: '5', step: '0.1' }}
            value={formik.values.rating}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rating && !!formik.errors.rating}
            helperText={formik.touched.rating && formik.errors.rating}
            variant="outlined"
          />

          {/* Thumbnail URL */}
          <TextField
            fullWidth
            label="URL Gambar (Thumbnail)"
            name="thumbnail"
            placeholder="https://example.com/image.jpg"
            value={formik.values.thumbnail}
            onChange={formik.handleChange}
            variant="outlined"
            helperText="Format: https://..."
          />

          {/* Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveOutlined />}
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={() => navigate('/products/all')}
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              Batal
            </Button>
          </Box>
        </Box>
      </form>
    </MainCard>
  );
}
