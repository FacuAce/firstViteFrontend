import { Button, Group, Modal, Space, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import Axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle } from "tabler-icons-react";
import { IArticulo } from "../../interfaces/IArticulo";

export const ArticulosAdminModal = ({
  visible,
  onClose,
  afterCreate,
  initialData = { Descripcion: "", Codigo: "", Costo: 0 },
}: {
  visible?: boolean;
  onClose: () => void;
  afterCreate: () => void;
  initialData?: IArticulo;
}) => {
  const [loading, setLoading] = useState(false);
  const urlArticulos = "http://localhost:3000/articulos";

  const form = useForm<IArticulo>({
    initialValues: initialData,
    validate: {
      Codigo: (value) => {
        if (!value) {
          return "Debe ingresar el codigo";
        }
      },
      Costo: (value) => {
        if (!value) {
          return "Debe ingresar el Costo";
        }
      },
    },
  });

  const createArticulo = async (articulo: IArticulo) => {
    await Axios({
      method: "post",
      url: urlArticulos,
      data: {
        Descripcion: articulo.Descripcion,
        Codigo: articulo.Codigo,
        Costo: new Number(articulo.Costo),
        additionalProp1: {},
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const UpdateArticulo = async (articulo: IArticulo) => {
    let { id, ...input } = articulo;
    await Axios({
      method: "put",
      url: `${urlArticulos}/${id}`,
      data: {
        id: id,
        Descripcion: input.Descripcion,
        Codigo: input.Codigo,
        Costo: new Number(input.Costo),
        additionalProp1: {},
      },
    });
  };

  const executeOperation = (values: IArticulo) => {
    const { id, ...input } = values;
    if (id) {
      return UpdateArticulo(values);
    }
    return createArticulo(input);
  };

  useEffect(() => {
    if (!visible) {
      form.reset();
    } else if (initialData.id) {
      form.setValues(initialData);
    }
  }, [visible, initialData.id]);

  const ModalTitle = useMemo(() => {
    if (initialData.id) return "Modificar Articulo";
    return "Crear rol";
  }, [initialData.id]);

  const submitButtonLabel = useMemo(() => {
    if (initialData.id) return "Modificar";
    return "Crear";
  }, [initialData.id]);

  return (
    <>
      <Modal opened={visible || false} onClose={onClose} title={ModalTitle}>
        <form
          onSubmit={form.onSubmit((values) => {
            setLoading(true);
            executeOperation(values)
              .then(() => afterCreate())
              .catch((err) => console.log(err))
              .finally(() => setLoading(false));
          })}
        >
          <TextInput
            label="Descripcion"
            placeholder="Ingrese descripcion"
            {...form.getInputProps("Descripcion")}
          />
          <TextInput
            withAsterisk
            label="Codigo"
            placeholder="Ingrese codigo"
            {...form.getInputProps("Codigo")}
          />
          <TextInput
            withAsterisk
            label="Costo"
            placeholder="Ingrese costo"
            {...form.getInputProps("Costo")}
          />
          <Space h="md"></Space>
          <Group position="right">
            <Button type="submit" loading={loading}>
              {submitButtonLabel}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export const DeleteArticuloModal = ({
  visible,
  onClose,
  afterCreate,
  initialData = { id: "", Descripcion: "", Codigo: "", Costo: 0 },
}: {
  visible?: boolean;
  onClose: () => void;
  afterCreate: () => void;
  initialData?: IArticulo;
}) => {
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState(false);
  const urlArticulos = "http://localhost:3000/articulos";

  const deleteArticulo = async (articulo: IArticulo) => {
    let id = articulo.id;
    await Axios({
      method: "delete",
      url: `${urlArticulos}/${articulo.id}`,
    }).catch((err) => console.log(err));
  };

  return (
    <>
      <Modal
        title={
          <Group>
            <AlertCircle />
            <Text>Eliminar Articulo</Text>
          </Group>
        }
        opened={visible || false}
        onClose={onClose}
      >
        <Text>{`¿Esta seguro de querer eliminar el articulo ${initialData.Codigo}?`}</Text>
        <Space h="lg"></Space>
        <Group position="right">
          <Button
            color="red"
            loading={deleteModalButtonLoading}
            onClick={() => {
              setDeleteModalButtonLoading(true);
              deleteArticulo(initialData)
                .then(() => afterCreate())
                .catch((err) => console.log(err))
                .finally(() => {
                  setDeleteModalButtonLoading(false);
                });
            }}
          >
            Eliminar
          </Button>
        </Group>
      </Modal>
    </>
  );
};
