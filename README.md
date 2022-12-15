# StoreReactViteFrontend

Frontend para administrar artículos, ya sea crearlos, modificarlos o eliminarlos, y también ver un listado de estos.

## Funcionamiento

Para que este funcione debe descargar las dependencias con el comando:

```sh
npm install
```

Para instalar solo dependencias resueltas en `package-lock.json`:

```sh
npm ci
```
Antes de correr esta aplicacion deberá correr el storeloopback del siguiente repositorio: https://github.com/FacuAce/storeloopback y asegurarse que las constantes `urlArticulos` tanto en `src/pages/articulosPage/ArticulosPage` y `src/pages/articulosPage/ArticulosAdminModal` coincidan con la url del backend.

## Correr la aplicación

Para iniciar la aplicación utilice el siguiente comando: 

```sh
npm run dev
```
