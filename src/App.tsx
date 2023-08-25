import React, {useEffect, useState} from 'react';
import Fab from '@mui/material/Fab';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import {MyModal} from './components';
import {Action, ChdGrade, KWY, LZ, QKS} from './actions';


function App() {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState<Action[]>([])
  const handleOpen = () => setOpen(true)


  useEffect(() => {
    setList([
      new ChdGrade(),
      new KWY(),
      new LZ(),
      new QKS()
    ])
  }, [])

  return (
    <>
      {
        list.filter(k => k.MatchURL()).map(k => {
          return <>
            <Fab variant="extended" size="small" color="primary" style={{
              position: 'fixed',
              top: '16px',
              right: '16px',
            }} onClick={handleOpen}>
              <ListRoundedIcon sx={{ mr: 1 }} />查看
            </Fab>
            <MyModal open={open} setOpen={setOpen} data={k} />
          </>
        })
      }
    </>
  );
}

export default App;