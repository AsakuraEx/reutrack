# API Routes Documentation

## Routes

### Acuerdo Compromiso
- **GET** `/:id_reunion` - Calls `acuerdoController.index`
- **POST** `/create` - Calls `acuerdoController.create`
- **DELETE** `/delete/:id` - Calls `acuerdoController.delete`

### Punto Reunion
- **GET** `/:id_reunion` - Calls `puntoReunionController.index`
- **POST** `/create` - Calls `puntoReunionController.create`
- **DELETE** `/delete/:id` - Calls `puntoReunionController.delete`

### Encargado
- **GET** `/:id_reunion` - Calls `encargadoController.index`
- **POST** `/create` - Calls `encargadoController.create`
- **DELETE** `/delete/:id` - Calls `encargadoController.delete`

### Minuta Reunion
- **POST** `/create` - Calls `minutaReunionController.create`
- **PATCH** `/update/:id_reunion` - Calls `minutaReunionController.update`
- **DELETE** `/delete` - Calls `minutaReunionController.delete`
- **GET** `/:id_reunion` - Calls `minutaReunionController.index`

### Proyecto
- **GET** `/` - Calls `proyectoController.index`
- **GET** `/:id` - Calls `proyectoController.getOne`
- **POST** `/create` - Calls `proyectoController.create`
- **PATCH** `/update/:id` - Calls `proyectoController.update`
- **PATCH** `/cancelar/:id` - Calls `proyectoController.cancelar`
- **PATCH** `/finalizar/:id` - Calls `proyectoController.finalizar`

### Index
- **GET** `/` - Renders the home page.

### Reunion
- **GET** `/` - Calls `reunionController.index`
- **GET** `/reunion-actual/:codigo` - Calls `reunionController.actual`
- **GET** `/ultima` - Calls `reunionController.ultima`
- **GET** `/detalle/:codigo` - Calls `reunionController.detalle`
- **POST** `/create` - Calls `reunionController.create`
- **PATCH** `/cancelar/:id` - Calls `reunionController.cancelar`
- **PATCH** `/finalizar/:id` - Calls `reunionController.finalizar`
- **GET** `/pdf/:id` - Calls `reunionController.generatePDF`
- **GET** `/:id` - Calls `reunionController.getOne`

### Estados
- **GET** `/getOne/:id` - Calls `estadoController.getOne`
- **GET** `/` - Calls `estadoController.index`
- **POST** `/create` - Calls `estadoController.create`

### Lista Asistencia
- **GET** `/:id` - Calls `listaAsistenciaController.index`
- **POST** `/create` - Calls `listaAsistenciaController.create`
- **DELETE** `/delete/:id` - Calls `listaAsistenciaController.delete`

### Version
- **GET** `/` - Calls `versionController.index`
- **GET** `/version/:id` - Calls `versionController.getOne`
- **POST** `/create` - Calls `versionController.create`
- **PATCH** `/update/:id` - Calls `versionController.update`
- **PATCH** `/cancelar/:id` - Calls `versionController.cancelar`
- **PATCH** `/finalizar/:id` - Calls `versionController.finalizar`

### Users
- **GET** `/` - Calls `usuariosController.index`
- **POST** `/create` - Calls `usuariosController.create`
- **PATCH** `/updatepassword` - Calls `usuariosController.updatePassword`
- **PATCH** `/updateStatus` - Calls `usuariosController.status`
- **PATCH** `/:id` - Calls `usuariosController.update`
- **GET** `/:id` - Calls `usuariosController.getOne`
