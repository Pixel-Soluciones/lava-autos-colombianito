# Proyecto: Lava Autos Colombianito

Este repositorio contiene el código fuente para el desarrollo de la aplicación web **Lava Autos Colombianito**, una herramienta diseñada para facilitar la gestión de servicios, trabajadores, vehículos y reportes en un lava autos. La aplicación está dividida en dos partes principales: backend y frontend.

## Estructura del Repositorio

```
/
├── back/          # Backend (Node.js + Express)
├── front/         # Frontend (Angular)
├── .gitignore     # Configuración para ignorar archivos innecesarios
├── LICENSE        # Licencia del proyecto
└── README.md      # Este archivo
```

## Tecnologías Utilizadas

### Frontend
- **Framework**: Angular
- **Componentes**: Angular Material
- **Capacidades**:
  - Responsividad para dispositivos móviles y tabletas.
  - Soporte offline mediante Service Workers.

### Backend
- **Framework**: Express.js
- **Base de Datos**: MySQL
- **ORM**: Sequelize
- **Seguridad**: Middleware para autenticación y protección de datos (JWT, CORS, Helmet).

## Instalación y Configuración

### Requisitos Previos
1. Node.js (v16 o superior).
2. MySQL (v8 o superior).
3. Angular CLI (v15 o superior).
4. Git instalado.

### Clonar el Repositorio
```bash
git clone https://github.com/[usuario]/[repositorio].git
cd [repositorio]
```

### Backend
1. Navega al directorio del backend:
   ```bash
   cd back
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` con las variables de entorno necesarias:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=lava_autos
   JWT_SECRET=tu_secreto
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```

### Frontend
1. Navega al directorio del frontend:
   ```bash
   cd front
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la aplicación en modo de desarrollo:
   ```bash
   ng serve
   ```

La aplicación estará disponible en: `http://localhost:4200`

## Características Principales

1. **Gestión de Servicios**: Registro, modificación, eliminación y visualización de servicios realizados.
2. **Gestión de Trabajadores**: Administración de información personal y asignación de tareas.
3. **Gestión de Vehículos**: Control de datos de vehículos y asociación con clientes y servicios.
4. **Reportes**: Generación de reportes financieros y de desempeño.

## Licencia
Este proyecto está cubierto bajo la licencia propietaria. Consulta el archivo [LICENSE](./LICENSE) para más información.

## Contribuciones
Actualmente, este proyecto no acepta contribuciones externas.

## Contacto
Para dudas o consultas, contacta a:
- **Nombre**: Pixel Soluciones
- **Email**: [tu_email@example.com]

