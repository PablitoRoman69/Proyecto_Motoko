import { useEffect, useState } from 'react';
import { musica2_backend } from 'declarations/musica2_backend';
import { Container, Row, td, Card, Table, Button, Col, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FormSong from './FormSong';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"


function App() {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
useEffect(() => {
  getSongs();
}, []);

  function getSongs() {
    Swal.fire("Cargando cancion, espere porfavor...");
    Swal.showLoading();
    musica2_backend.getAllSongs().then(songs => {
      setSongs(songs);
      Swal.close();
    });
}
function getSong(id) {
  Swal.fire("Cargando cancion, espere porfavor...");
  Swal.showLoading();
  musica2_backend.getSongById(BigInt(id)).then(song => {
    console.log(song)
    setSong(song.shift());
    Swal.close();
    setShow(true)
  });  
}

function deleteSong(id) {
  Swal.fire("Eliminando cancion, espere porfavor...");
  Swal.showLoading();
  musica2_backend.deleteSong(BigInt(id)).then(() => {
   getSongs();
   
  });  
}



  return (
    <Container>
            <Row>
                <Card>
                    <Card.Body>
                      <Row>
                        <Col>
                        <Card.Title>
                            Lista de Canciones
                        </Card.Title>
                       </Col>
                       <Col>
                       <Button variant="warning"><Link to = '/Crear-cancion'>Agregar Cancion</Link></Button>
                       </Col>
                      </Row>
                        <Table>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Titulo</th>
                              <th>Descripcion</th>
                              <th>Rating</th>
                              <th>Opciones</th>
                            </tr>
                           </thead>
                           <tbody>
                            {
                              songs.length > 0 ?
                              songs.map((song)=>(
                                <tr>
                                  <td>{Number(song.id)}</td>
                                  <td>{song.title}</td>
                                  <td>{song.description}</td>
                                  <td>{Number(song.rating)}</td>
                                  <td>
                                    <Row>
                                     <Col><Button variant = "info" onClick = {() => getSong(Number(song.id))}>Editar</Button></Col>
                                     <Col><Button variant = "danger" onClick = {() => deleteSong(Number(song.id))}>Eliminar</Button></Col>
                                </Row>
                              </td>
                                </tr>
                              ))
                              : <tr></tr>
                            }
                           </tbody>
                        </Table>   
                    </Card.Body>
                </Card>
            </Row>
<Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Canción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormSong
            id = {Number(song.id)}
            pTitle = {song.title}
            pDescription = {song.description}
            pRating = {Number(song.rating)}
            isEditable = {true}
            getSongs={getSongs}
            setShow = {setShow}
          />

          </Modal.Body>
      </Modal>
        </Container>
  );
}

export default App;
