import Axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { IArticulo } from "../../interfaces/IArticulo";
import {
  ArticulosAdminModal,
  DeleteArticuloModal,
} from "./ArticulosAdminModal";
import {
  DotsVertical,
  Edit,
  Trash,
} from "tabler-icons-react";
import {
  Button,
  Group,
  Space,
  Table,
  Menu,
  UnstyledButton,
  LoadingOverlay,
  Text,
} from "@mantine/core";

const ArticulosPages = () => {
  const [articulos, setArticulo] = useState<IArticulo[]>([]);
  const [articulosLoading, setArticulosLoading] = useState(false);
  const [articuloToUpdate, setArticuloToUpdate] = useState<
    IArticulo | undefined
  >();
  const [articuloToDelete, setArticuloToDelete] = useState<
    IArticulo | undefined
  >();
  const [opened, setOpened] = useState(false);
  const urlArticulos = "http://localhost:3000/articulos";

  const afterCreateModal = () => {
    setOpened(false);
    setArticuloToUpdate(undefined);
    getArticulosFromServer();
  };

  const getArticulos = async () => {
    return await Axios.get(urlArticulos);
  };

  const getArticulosFromServer = () => {
    setArticulosLoading(true);
    getArticulos()
      .then((response) => {
        setArticulo(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setArticulosLoading(false);
      });
  };

  useEffect(() => {
    getArticulosFromServer();
  }, []);

  const onClose = () => {
    setOpened(false);
    setArticuloToUpdate(undefined);
  };

  return (
    <>
      <Space h="lg" />
      <h1>Tienda de articulos</h1>
      <Space h="lg" />
      <Space h="lg" />
      <h3>Los articulos son: </h3>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Agregar articulo</Button>
      </Group>
      <Space h="lg" />
      <div style={{ position: "relative" }}>
        <Table striped withBorder>
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Codigo</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {articulos.map((item) => (
              <tr key={item.id}>
                <td>{item.Descripcion}</td>
                <td>{item.Codigo}</td>
                <td>{"$" + item.Costo}</td>
                <td>
                  <Menu shadow="sm">
                    <Menu.Target>
                      <Group position="center">
                        <UnstyledButton>
                          <DotsVertical />
                        </UnstyledButton>
                      </Group>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        onClick={() => {
                          setArticuloToUpdate(item);
                        }}
                        icon={<Edit />}
                      >
                        Editar
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => {
                          setArticuloToDelete(item);
                        }}
                        icon={<Trash />}
                      >
                        Eliminar
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <LoadingOverlay visible={articulosLoading} />
      </div>
      {/*Modal agregar o modificar articulo */}
      <ArticulosAdminModal
        afterCreate={afterCreateModal}
        onClose={onClose}
        initialData={articuloToUpdate}
        visible={opened || !!articuloToUpdate}
      />
      {/*Modal eliminar articulo */}
      <DeleteArticuloModal
        afterCreate={() => {
          setArticuloToDelete(undefined);
          getArticulosFromServer();
        }}
        onClose={() => setArticuloToDelete(undefined)}
        initialData={articuloToDelete}
        visible={!!articuloToDelete}
      />
    </>
  );
};

export default ArticulosPages;
