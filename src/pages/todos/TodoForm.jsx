import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, FormControlLabel, Checkbox, Alert, CircularProgress } from '@mui/material';
import MainCard from 'components/MainCard';
import { useGetTodoById, addTodo, updateTodo } from 'api/todos';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const validationSchema = Yup.object({
  todo: Yup.string().required('Todo wajib diisi').min(3)
});

export default function TodoForm(){
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { todo: existingTodo, isLoading } = useGetTodoById(id);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const formik = useFormik({
    initialValues: { todo: '', completed: false, userId: 1 },
    validationSchema,
    onSubmit: async (values) => {
      try{
        setLoading(true);
        if(isEdit){
          await updateTodo(id, values);
          setAlert({severity: 'success', message: 'Todo diperbarui'});
        } else {
          await addTodo(values);
          setAlert({severity: 'success', message: 'Todo dibuat'});
        }
        setTimeout(() => navigate('/todos/all'), 800);
      } catch(e){
        setAlert({severity: 'error', message: 'Gagal menyimpan'});
        setLoading(false);
      }
    }
  });

  useEffect(()=>{
    if(existingTodo && isEdit){
      formik.setValues({ todo: existingTodo.todo || '', completed: !!existingTodo.completed, userId: existingTodo.userId || 1 });
    }
  }, [existingTodo, isEdit]);

  if(isEdit && isLoading) return <MainCard><Box sx={{ display: 'flex', justifyContent: 'center', p: 6 }}><CircularProgress/></Box></MainCard>;

  return (
    <MainCard>
      {alert && <Alert severity={alert.severity} onClose={()=>setAlert(null)} sx={{ mb:2 }}>{alert.message}</Alert>}
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600 }}>
          <TextField label="Todo" name="todo" value={formik.values.todo} onChange={formik.handleChange} error={formik.touched.todo && !!formik.errors.todo} helperText={formik.touched.todo && formik.errors.todo} />
          <FormControlLabel control={<Checkbox name="completed" checked={formik.values.completed} onChange={(e)=>formik.setFieldValue('completed', e.target.checked)} />} label="Completed" />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" startIcon={<SaveOutlined/>} disabled={loading}>{loading? 'Menyimpan...': 'Simpan'}</Button>
            <Button variant="outlined" startIcon={<ArrowLeftOutlined/>} onClick={()=>navigate('/todos/all')}>Batal</Button>
          </Box>
        </Box>
      </form>
    </MainCard>
  );
}
