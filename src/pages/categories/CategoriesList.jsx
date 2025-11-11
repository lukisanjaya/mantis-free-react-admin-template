import { useState, useMemo } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Button,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment
} from '@mui/material';
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useGetRecipes } from 'api/recipes';

export default function CategoriesList(){
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { recipes, total, isLoading, error, mutate } = useGetRecipes(rowsPerPage, page * rowsPerPage);

  const filtered = useMemo(()=>{
    if(!search) return recipes;
    return recipes.filter(r => (r.title || r.name || '').toLowerCase().includes(search.toLowerCase()));
  }, [recipes, search]);

  if(error) return <MainCard><Alert severity="error">Gagal memuat recipes</Alert></MainCard>;

  return (
    <MainCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <h3>Recipes</h3>
          <div>Daftar resep dari DummyJSON</div>
        </Box>
      </Box>

      <Box sx={{ my: 2 }}>
        <TextField value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Cari resep..." size="small" InputProps={{ startAdornment: (<InputAdornment position="start"><SearchOutlined/></InputAdornment>) }} />
      </Box>

      <TableContainer component={Paper}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress/></Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Judul</TableCell>
                  <TableCell>Servings</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length ? filtered.map(r => (
                  <TableRow key={r.id} hover>
                    <TableCell>{r.id}</TableCell>
                    <TableCell style={{ maxWidth: 400 }}>{r.title || r.name}</TableCell>
                    <TableCell>{r.servings}</TableCell>
                    <TableCell>{r.time || r.readyInMinutes || '-'}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button
                          component={RouterLink}
                          to={`/recipes/view/${r.id}`}
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EyeOutlined />}
                          sx={{ textTransform: 'none' }}
                        >
                          Lihat
                        </Button>
                        <Button
                          variant="contained"
                          color="info"
                          size="small"
                          startIcon={<EditOutlined />}
                          onClick={() => navigate(`/recipes/edit/${r.id}`)}
                          sx={{ textTransform: 'none' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          startIcon={<DeleteOutlined />}
                          onClick={() => {
                            if (window.confirm(`Hapus resep "${r.name}"?`)) {
                              alert(`Delete resep "${r.name}" akan diproses`);
                            }
                          }}
                          sx={{ textTransform: 'none' }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={5} align="center" sx={{ py: 3 }}>Tidak ada data</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination component="div" count={total} rowsPerPage={rowsPerPage} page={page} onPageChange={(e,p)=>setPage(p)} onRowsPerPageChange={(e)=>{ setRowsPerPage(parseInt(e.target.value,10)); setPage(0); }} rowsPerPageOptions={[5,10,20]} />
          </>
        )}
      </TableContainer>
    </MainCard>
  );
}
