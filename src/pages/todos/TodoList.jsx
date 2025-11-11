import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  IconButton as MuiIconButton,
  Checkbox,
  TextField,
  InputAdornment
} from '@mui/material';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { useGetTodos, deleteTodo, updateTodo } from 'api/todos';

export default function TodoList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState(null);

  const { todos, total, isLoading, error, mutate } = useGetTodos(rowsPerPage, page * rowsPerPage);

  const filtered = useMemo(() => {
    if (!search) return todos;
    return todos.filter((t) => t.todo.toLowerCase().includes(search.toLowerCase()));
  }, [todos, search]);

  const handleToggle = async (item) => {
    try {
      await updateTodo(item.id, { completed: !item.completed });
      setAlert({ severity: 'success', message: `Todo ${item.id} updated` });
      setTimeout(() => mutate(), 400);
    } catch (err) {
      setAlert({ severity: 'error', message: 'Gagal update todo' });
    }
  };

  const handleDelete = (item) => {
    if (!confirm(`Hapus todo #${item.id}?`)) return;
    deleteTodo(item.id)
      .then(() => {
        setAlert({ severity: 'success', message: 'Todo berhasil dihapus' });
        setTimeout(() => mutate(), 400);
      })
      .catch(() => setAlert({ severity: 'error', message: 'Gagal menghapus' }));
  };

  if (error) return <MainCard><Alert severity="error">Gagal memuat todos</Alert></MainCard>;

  return (
    <MainCard>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <h3>Todos</h3>
          <div>Kelola daftar todos dari DummyJSON</div>
        </Box>
        <Box>
          <Link to="/todos/add" style={{ textDecoration: 'none' }}>
            <Button variant="contained" startIcon={<PlusOutlined />}>Tambah Todo</Button>
          </Link>
        </Box>
      </Box>

      <Box sx={{ my: 2 }}>
        <TextField
          placeholder="Cari todo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchOutlined /></InputAdornment>) }}
        />
      </Box>

      {alert && <Alert severity={alert.severity} onClose={() => setAlert(null)} sx={{ mb: 2 }}>{alert.message}</Alert>}

      <TableContainer component={Paper}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress /></Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Todo</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell align="center">Completed</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length ? filtered.map((t) => (
                  <TableRow key={t.id} hover>
                    <TableCell>{t.id}</TableCell>
                    <TableCell style={{ maxWidth: 400 }}>{t.todo}</TableCell>
                    <TableCell>{t.userId}</TableCell>
                    <TableCell align="center"><Checkbox checked={t.completed} onChange={() => handleToggle(t)} /></TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => navigate(`/todos/edit/${t.id}`)} title="Edit"><EditOutlined /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(t)} title="Hapus"><DeleteOutlined /></IconButton>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={5} align="center" sx={{ py: 3 }}>Tidak ada data</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, p) => setPage(p)}
              onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              rowsPerPageOptions={[5,10,20,50]}
            />
          </>
        )}
      </TableContainer>
    </MainCard>
  );
}
