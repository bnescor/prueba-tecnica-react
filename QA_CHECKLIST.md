# QA Checklist - Pruebas Funcionales

## Flujo Completo de Pruebas Funcionales

### 1. Autenticación - Login Exitoso

**Objetivo**: Verificar que un usuario puede iniciar sesión con credenciales válidas

**Precondiciones**:

- Aplicación accesible en localhost:3000
- Usuario registrado en el sistema

**Pasos**:

1. Navegar a la página de login
2. Ingresar credenciales válidas (email: `a.berrio@yopmail.com`, password: `AmuFK8G4Bh64Q1uX+IxQhw==`)
3. Hacer clic en el botón "Ingresar"

**Resultado Esperado**:

- ✅ Usuario redirigido al dashboard/home
- ✅ Token de sesión almacenado correctamente
- ✅ Menú de navegación visible con opción de logout

---

### 2. Autenticación - Login Fallido

**Objetivo**: Verificar el manejo de credenciales inválidas

**Precondiciones**:

- Aplicación accesible

**Pasos**:

1. Navegar a la página de login
2. Ingresar credenciales inválidas (email: `invalid@example.com`, password: `wrong`)
3. Hacer clic en el botón "Ingresar"

**Resultado Esperado**:

- ✅ Mensaje de error claro y visible ("Credenciales inválidas")
- ✅ Usuario permanece en la página de login
- ✅ No se almacena token de sesión

---

### 3. Validación de Campos - Login

**Objetivo**: Verificar validaciones en formulario de login

**Precondiciones**:

- Aplicación accesible

**Pasos**:

1. Navegar a la página de login
2. Intentar enviar el formulario con campos vacíos
3. Ingresar email con formato inválido (ejemplo: "correo-invalido")

**Resultado Esperado**:

- ✅ Mensajes de validación visibles para campos requeridos
- ✅ Validación de formato de email funciona correctamente
- ✅ Botón de envío deshabilitado o previene envío hasta que datos sean válidos

---

### 4. Listado - Visualización de Datos

**Objetivo**: Verificar que el listado de acciones se muestra correctamente

**Precondiciones**:

- Usuario autenticado
- Al menos 5 registros existentes en la base de datos

**Pasos**:

1. Iniciar sesión exitosamente
2. Navegar a la página de Bakanes/(lista de Categorias)
3. Observar la visualización de datos

**Resultado Esperado**:

- ✅ Lista de acciones visible con datos correctos
- ✅ Diseño responsive y legible
- ✅ Sin errores de consola

---

### 5. Paginación - Navegación Entre Páginas

**Objetivo**: Verificar funcionamiento de la paginación

**Precondiciones**:

- Usuario autenticado
- Más de 10 registros en base de datos (asumiendo 10 items por página)

**Pasos**:

1. Acceder al listado de categorias
2. Observar los controles de paginación
3. Hacer clic o ingresar el numero de pagina "2" o botón "Siguiente"
4. Hacer clic ingresar el numero de pagina "1" o botón "Anterior"

**Resultado Esperado**:

- ✅ Controles de paginación visibles (botones Anterior/Siguiente, números de página)
- ✅ Se cargan correctamente los datos de la página 2
- ✅ Navegación fluida sin pérdida de autenticación
- ✅ Indicador visual de página actual

---

### 6. Paginación - Límites y Estados

**Objetivo**: Verificar comportamiento en límites de paginación

**Precondiciones**:

- Usuario autenticado
- Más de 10 registros en base de datos (asumiendo 10 items por página)

**Pasos**:

1. Navegar a la primera página del listado
2. Verificar estado del botón "Anterior"
3. Navegar a la última página disponible
4. Verificar estado del botón "Siguiente"

**Resultado Esperado**:

- ✅ Botón "Anterior" deshabilitado en primera página
- ✅ Botón "Siguiente" deshabilitado en última página
- ✅ Información clara del total de registros y páginas
- ✅ Sin errores al intentar navegar más allá de los límites

---

### 7. Paginación - numero invalido

**Objetivo**: Verificar comportamiento en límites de paginación con alteracion de los paremetro del numero de pagina

**Precondiciones**:

- Usuario autenticado
- Más de 10 registros en base de datos (asumiendo 10 items por página)

**Pasos**:

1. Ingresar un numero de pagina igual o menor a 0
2. Ingresar un numero de pagina maximo al numero total de pagina disponible
3. Alterar la url de la ingresando un texto en ves de numero

**Resultado Esperado**:

- ✅ Se dirige automaticamente a la primera pagina
- ✅ Se dirige automaticamente a la ultima pagina
- ✅ Se dirige a la primera pagina

---

### 8. Crear Acción - Creación Exitosa

**Objetivo**: Verificar la creación de una nueva acción

**Precondiciones**:

- Usuario autenticado
- Formulario de creación accesible

**Pasos**:

1. Hacer clic en botón "Nueva Acción" o "Crear"
2. Completar todos los campos requeridos:
   - Título: "Tarea de Prueba QA"
   - Descripción: "Esta es una acción creada para validar funcionalidad"
   - Color: "#0000FF"
   - Logo: "Subir una archivo de imagen"
   - Activo: "Presione el switch para cambiar de activo a inactivo"
3. Hacer clic en "Guardar" o "Crear"

**Resultado Esperado**:

- ✅ Mensaje de confirmación "Creacion de categoria exitosa"
- ✅ Redirección al listado o actualización automática
- ✅ Nueva acción visible en el listado
- ✅ Datos guardados correctamente en base de datos

---

### 9. Persistencia de Sesión

**Objetivo**: Verificar que la sesión se mantiene al refrescar la página

**Pasos**:

1. Iniciar sesión
2. Refrescar página (F5)

**Resultado Esperado**:

- ✅ Usuario permanece autenticado
- ✅ No redirige a login

---

### 10. Logout

**Objetivo**: Verificar el cierre de sesión correcto

**Pasos**:

1. Hacer clic en botón "Cerrar Sesión"
2. Intentar acceder a rutas protegidas mediante URL

**Resultado Esperado**:

- ✅ Sesión cerrada correctamente
- ✅ Token eliminado
- ✅ Redireccionado a login al intentar acceder rutas protegidas

---

### 11. Ruta protegidad

**Objetivo**: Verificar que no tenga acceso a las rutan sin estar autenticado

**Pasos**:

1. Cerrar sesion o eliminar el localstore donde se almecena el token
2. Intenta accerder a la ruta Home "/" o a las demas que sea diferente a la ruta de login

**Resultado Esperado**:

- ✅ El usuario no tendra acceso a esas rutas
- ✅ Se direcionara al login de forma automaticamente

---

### 12. Login persistente

**Objetivo**: Verificar que el usuario este autentica

**Precondiciones**:

- Usuario autenticado

**Pasos**:

1. Dirigirse a la ruta de login

**Resultado Esperado**:

- ✅ Se direcionara al login de forma automaticamente a la ruta de home

---

## Resumen de Resultados

---

| #   | Caso de Prueba        | Estado | Comentarios |
| --- | --------------------- | ------ | ----------- |
| 1   | Login Exitoso         | ⬜     |             |
| 2   | Login Fallido         | ⬜     |             |
| 3   | Validación Login      | ⬜     |             |
| 4   | Visualización Listado | ⬜     |             |
| 5   | Navegación Paginación | ⬜     |             |
| 6   | Límites Paginación    | ⬜     |             |
| 7   | Numero invalido Pag.  | ⬜     |             |
| 8   | Crear Acción          | ⬜     |             |
| 9   | Sesión activa         | ⬜     |             |
| 10  | Logout                | ⬜     |             |
| 11  | Ruta protegidad       | ⬜     |             |
| 12  | Editar Acción         | ⬜     |             |

---

**Leyenda**: ✅ Pasó | ❌ Falló | ⬜ Pendiente | ⚠️ Bloqueado

---

## Notas Generales

- Todas las pruebas deben ejecutarse en navegadores principales: Chrome, Firefox, Safari
- Verificar comportamiento responsive en diferentes tamaños de pantalla
- Documentar cualquier bug encontrado con pasos para reproducirlo
- Incluir capturas de pantalla de errores críticos
