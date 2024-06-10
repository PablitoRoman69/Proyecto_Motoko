import React, {useState}from 'react'
import { Form, Button, Container, Row, Card, Col} from 'react-bootstrap';
import Swal from 'sweetalert2'
import { musica2_backend } from 'declarations/musica2_backend';
import { useNavigate } from "react-router-dom"



const FormSong = (
  {
  id = null,
  pTitle = null,
  pDescription = null,
  pRating = null,
  isEditable = null,
  getSongs = null,
  setShow = null
  }
) => {
    const [title, setTitle] = useState(pTitle ? pTitle:"");
    const [description, setDescription] = useState(pDescription ? pDescription:"");
    const [rating, setRating] = useState(pRating ? pRating : 0);

    const navigate = useNavigate()

    const onChangeTitle = (e) => {
      e.preventDefault();
      console.log(e.target)
      const preTitle = e.target.value;
      setTitle(preTitle);
    }
    const onChangeDescription = (e) => {
      e.preventDefault();
      const preDescription = e.target.value;
      setDescription(preDescription);
    }
    const onChangeRating = (e) => {
      e.preventDefault();
      const preRating = e.target.value;
      setRating(preRating);
    }

    function createSong() {
      Swal.fire("Guardando cancion, espere porfavor...");
      Swal.showLoading();
      musica2_backend.addSong(BigInt(rating), title, description).then(song => {
      Swal.fire({
        icon: "success",
        title: "Tu cancion se guardo correctamente :)",
        showConfirmButton: false,
        timer: 1500
      }).then(() => navigate('/'))
      }).catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Ops, Algo salio mal",
        });
        console.log("Error al intentar guardar la cancion :(", err)
      })
  }

  function updateSong() {
    Swal.fire("Actualizando cancion, espere porfavor...");
    Swal.showLoading();
    musica2_backend.updateSong(BigInt(id), title, description, BigInt(rating) ).then(song => {
    Swal.fire({
      icon: "success",
      title: "Tu cancion se actualizo correctamente :)",
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      setShow(false);
      getSongs();
    })
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Ops, Algo salio mal",
      });
      console.log("Error al intentar actualizar la cancion :(", err)
    })
}
console.log("valores al cargar el componente al editar", id)
console.log("valores al cargar el componente al editar", pTitle)
console.log("valores al cargar el componente al editar", pDescription)
console.log("valores al cargar el componente al editar", pRating)
console.log("valores al cargar el componente al editar", isEditable)


    return( 
      <Container className='m-5'>
        <Row>
          <Col>
          <Card>
            <Card.Title>{isEditable ? "editar" : "agregar"} Cancion</Card.Title>
            <Card.Body> 
            <Form>
              <Row>
                <Col>
                <Form.Group className="mb-3">
          <Form.Label>Ingresa la cancion</Form.Label>
          <Form.Control defaultValue = {title} name="title" onChange = {onChangeTitle} type="text" placeholder="Ingresa cancion" />
        </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Form.Group className="mb-3">
          <Form.Label>Ingresa la descripcion de la cancion</Form.Label>
          <Form.Control defaultValue = {description} name="description" onChange = {onChangeDescription} as = "textarea" placeholder="Ingresa descripcion" />
        </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Form.Group className="mb-3">
          <Form.Label>Ingresa el rating de la cancion</Form.Label>
          <Form.Control defaultValue = {rating} name="rating" onChange = {onChangeRating} type="number" placeholder="Ingresa rating" />
        </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Button variant="primary" onClick = {isEditable ? updateSong : createSong}>
           {isEditable ? "editar" : "guardar"} Cancion
        </Button>
                </Col>
              </Row>
      </Form>
            </Card.Body>
          </Card>
          </Col>
        </Row>

      </Container>
    
    );
  }
  
  export default FormSong;


