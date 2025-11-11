import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Material-UI
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  CircularProgress,
  Card,
  CardHeader,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';

// Icons
import { DeleteOutlined, EditOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';

// Components
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// API
import { useGetProducts, deleteProduct } from 'api/products';

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

// ==============================|| PRODUCT LIST ||============================== //

export default function ProductList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState('');

  // Fetch products
  const { products, total, isLoading, error, mutate } = useGetProducts(rowsPerPage, page * rowsPerPage);

  // Filter by search
  const filteredProducts = useMemo(() => {
    if (!search) return products;
    return products.filter((product) => {
      const categoryName = safeString(product.category);
      const titleLower = safeString(product.title).toLowerCase();
      const categoryLower = categoryName.toLowerCase();
      const searchLower = search.toLowerCase();
      
      return titleLower.includes(searchLower) || categoryLower.includes(searchLower);
    });
  }, [products, search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (product) => {
    navigate(`/products/edit/${product.id}`, { state: { product } });
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProduct(selectedProduct.id);
      setAlert({ severity: 'success', message: 'Product berhasil dihapus!' });
      setOpenDialog(false);
      setTimeout(() => mutate(), 500);
    } catch (err) {
      setAlert({ severity: 'error', message: 'Gagal menghapus product!' });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  if (error)
    return (
      <MainCard>
        <Alert severity="error">Gagal memuat data products: {error.message}</Alert>
      </MainCard>
    );

  return (
    <>
      <MainCard>
        <CardHeader
          title="Daftar Produk"
          subheader="Kelola semua produk Anda"
          action={
            <Link to="/products/add" style={{ textDecoration: 'none' }}>
              <Button variant="contained" startIcon={<PlusOutlined />}>
                Tambah Produk
              </Button>
            </Link>
          }
        />
        <Divider sx={{ my: 2 }} />

        {/* Search */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
            size="small"
          />
        </Box>

        {/* Alert */}
        {alert && (
          <Alert severity={alert.severity} onClose={() => setAlert(null)} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        {/* Table */}
        <TableContainer component={Paper}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama Produk</TableCell>
                    <TableCell>Kategori</TableCell>
                    <TableCell align="right">Harga</TableCell>
                    <TableCell align="center">Stock</TableCell>
                    <TableCell align="center">Rating</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id} hover>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>
                          <Box sx={{ maxWidth: 200 }}>{safeString(product.title)}</Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'inline-block',
                              px: 1.5,
                              py: 0.5,
                              bgcolor: 'primary.lighter',
                              color: 'primary.main',
                              borderRadius: 1,
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            {safeString(product.category)}
                          </Box>
                        </TableCell>
                        <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                        <TableCell align="center">{product.stock}</TableCell>
                        <TableCell align="center">{product.rating.toFixed(1)} ⭐</TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(product)}
                            title="Edit"
                          >
                            <EditOutlined />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(product)}
                            title="Hapus"
                            color="error"
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                        {search ? 'Tidak ada hasil pencarian' : 'Tidak ada data'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </TableContainer>
      </MainCard>

      {/* Delete Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Hapus Produk</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus produk <strong>{selectedProduct?.title}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
