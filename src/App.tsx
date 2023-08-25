import { useEffect, useState } from 'react';
import './App.css';
import { Button, Modal, Table } from 'react-bootstrap';
import axios, { AxiosResponse } from 'axios';

interface d {
  order: string
  name: string
  token: string
}
interface c {
  name: string
  token: string[]
}


function App() {
  const [show, setShow] = useState(true)

  const hide = () => setShow(false)
  const [data, setData] = useState<d[]>([])
  const [nData, setNData] = useState<c[]>([])

  const getData = (page: number) => {
    axios.get(`https://chdact2.web.sdo.com/project/ChdGrade/order.asp?page=${page}`).then((response: AxiosResponse) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      const trs = doc.querySelectorAll('tr')
      for (let index = 1; index < trs.length; index++) {
        let tr = trs[index]
        let tds = tr.querySelectorAll(`td`)
        let item: d = {
          order: tds[1].innerHTML,
          name: '',
          token: ''
        }
        console.log(tds)
        if (tds[3].querySelectorAll('br').length > 0) {
          let names = tds[3].innerHTML.split('<br>').filter(k => k != '')
          let tokens = tds[4].innerHTML.split('<br>').filter(k => k != '')
          for (let index2 = 0; index2 < names.length; index2++) {
            let aaa = {
              order: tds[1].innerHTML,
              name: names[index2],
              token: tokens[index2]
            }
            console.log(aaa)
            setData(pre => { return [...pre, aaa] })
          }
        }
      }
      if (trs.length == 11) {
        getData(page + 1)
      }
    }).catch((error: any) => {
      console.error('請求失敗：', error);
    });
  }
  useEffect(() => {
    getData(1)
    return () => setData(pre => [])
  }, [])

  useEffect(() => {

    const filteredData: d[] = [];

    data.forEach(item => {
      const exists = filteredData.some(
        d => d.order === item.order && d.name === item.name && d.token === item.token
      );

      if (!exists) {
        filteredData.push(item);
      }
    });

    const transformedData: c[] = [];

    filteredData.forEach(item => {
      const existingIndex = transformedData.findIndex(d => d.name === item.name);

      if (existingIndex === -1) {
        // If name not found, add a new entry
        transformedData.push({ name: item.name, token: [item.token] });
      } else {
        // If name found, add token to existing entry
        transformedData[existingIndex].token.push(item.token);
      }
    });
    setNData(transformedData)

  }, [data])
 
  return (
    <>
      <Modal show={show} size="lg"
        aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton onClick={hide}>
          <Modal.Title>等級補完</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>道具名稱</th>
                <th>道具編碼</th>
              </tr>
            </thead>
            <tbody>
              {nData.map((value, index) => {
                return <tr>
                  <td>{index + 1}</td>
                  <td>{value.name}</td>
                  <td>{value.token.map(k => <>{k}<br /></>)}</td>
                </tr>
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
