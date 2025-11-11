# Mantis CRUD Pages Standards

## List Page Pattern

### Core Structure
```javascript
import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper, Button, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Alert, CircularProgress, CardHeader,
  Divider, TextField, InputAdornment
} from '@mui/material';
import { DeleteOutlined, EditOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

export default function EntityList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState('');

  // API hooks
  const { data, total, isLoading, error, mutate } = useGetEntities(rowsPerPage, page * rowsPerPage);

  // Search filter
  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Event handlers
  const handleEdit = (item) => navigate(`/entity/edit/${item.id}`);
  const handleDeleteClick = (item) => { setSelectedItem(item); setOpenDialog(true); };
  const handleDeleteConfirm = async () => {
    try {
      await deleteEntity(selectedItem.id);
      setAlert({ severity: 'success', message: 'Data berhasil dihapus!' });
      setOpenDialog(false);
      setTimeout(() => mutate(), 500);
    } catch (err) {
      setAlert({ severity: 'error', message: 'Gagal menghapus data!' });
    }
  };

  if (error) return <MainCard><Alert severity="error">Gagal memuat data</Alert></MainCard>;

  return (
    <>
      <MainCard>
        <CardHeader
          title="Daftar Entity"
          subheader="Kelola semua data entity"
          action={
            <Link to="/entity/add" style={{ textDecoration: 'none' }}>
              <Button variant="contained" startIcon={<PlusOutlined />}>
                Tambah Entity
              </Button>
            </Link>
          }
        />
        <Divider sx={{ my: 2 }} />

        {/* Search */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Cari entity..."
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
                    <TableCell>Nama</TableCell>
                    <TableCell align="center">Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow key={item.id} hover>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="center">
                          <IconButton size="small" onClick={() => handleEdit(item)} title="Edit">
                            <EditOutlined />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDeleteClick(item)} title="Hapus" color="error">
                            <DeleteOutlined />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
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
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </>
          )}
        </TableContainer>
      </MainCard>

      {/* Delete Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Hapus Entity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menghapus <strong>{selectedItem?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Batal</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
```

## Form Page Pattern

### Core Structure
```javascript
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Button, CardHeader, Divider, TextField, Alert, CircularProgress
} from '@mui/material';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required('Nama wajib diisi').min(3, 'Minimal 3 karakter')
});

export default function EntityForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Get existing data for edit mode
  const { data: existingData, isLoading: isLoadingData } = useGetEntityById(id);
  const isEditMode = !!id;

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (isEditMode) {
          await updateEntity(id, values);
          setAlert({ severity: 'success', message: 'Data berhasil diperbarui!' });
        } else {
          await addEntity(values);
          setAlert({ severity: 'success', message: 'Data berhasil ditambahkan!' });
        }
        setTimeout(() => navigate('/entity/all'), 1500);
      } catch (error) {
        setAlert({ severity: 'error', message: 'Gagal menyimpan data: ' + error.message });
        setLoading(false);
      }
    }
  });

  // Populate form with existing data
  useEffect(() => {
    if (existingData && isEditMode) {
      formik.setValues({
        name: existingData.name || ''
      });
    }
  }, [existingData, isEditMode]);

  if (isEditMode && isLoadingData) {
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
        title={isEditMode ? 'Edit Entity' : 'Tambah Entity Baru'}
        subheader={isEditMode ? `Edit entity #${id}` : 'Buat entity baru'}
        action={
          <Button
            variant="outlined"
            startIcon={<ArrowLeftOutlined />}
            onClick={() => navigate('/entity/all')}
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
          <TextField
            fullWidth
            label="Nama *"
            name="name"
            placeholder="Masukkan nama"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
          />

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
              onClick={() => navigate('/entity/all')}
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
```

## CRUD Standards Checklist

### List Page Requirements
- ✅ Search functionality with TextField + SearchOutlined icon
- ✅ Add button with PlusOutlined icon linking to form
- ✅ Table with pagination (5, 10, 25, 50 options)
- ✅ Edit/Delete action buttons with icons
- ✅ Delete confirmation dialog
- ✅ Loading state with CircularProgress
- ✅ Error handling with Alert component
- ✅ Empty state message
- ✅ CardHeader with title and subheader

### Form Page Requirements
- ✅ Edit/Add mode detection via useParams
- ✅ Formik + Yup validation
- ✅ Loading states for submit and data fetch
- ✅ Success/Error alerts
- ✅ Back button navigation
- ✅ Form field validation with error messages
- ✅ CardHeader with dynamic title
- ✅ Auto-redirect after successful save

### Common Patterns
- ✅ MainCard as page wrapper
- ✅ Material UI components consistently
- ✅ Ant Design icons for actions
- ✅ useState for local state management
- ✅ Custom API hooks (useGetEntities, useGetEntityById)
- ✅ Consistent spacing with sx prop
- ✅ Error boundaries and loading states
- ✅ Indonesian language for user messages

### File Naming Convention
- List: `EntityList.jsx`
- Form: `EntityForm.jsx`
- Detail: `EntityDetail.jsx` (optional)

### Route Structure
```javascript
{
  path: 'entity',
  children: [
    { path: 'all', element: <EntityList /> },
    { path: 'add', element: <EntityForm /> },
    { path: 'edit/:id', element: <EntityForm /> }
  ]
}
```