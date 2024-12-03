import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CustomProperty,
  FeatureCardVM,
  
} from "@/lib/features/canvas/models/CanvasVM";
import {
  addNode,
  handleClear,
  setCreateFeatureForm,
  setEditFeatureForm,
} from "@/lib/features/features/slices/FeaturesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Node } from "@xyflow/react";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { ColorNodeData } from "../models/ColorNodes";

interface FeatureFormProps {
  nodes: Node[];
  setNodes: (nodes: Node[]) => void;
}

export default function FeatureForm({
  nodes,
  setNodes,
}: FeatureFormProps) {
  const dispatch = useAppDispatch();

  const feature = useAppSelector((state) => state.features.feature); //get the selected feature from the store
  const createFeatureForm = useAppSelector(
    (state) => state.features.createFeatureForm
  ); //get the create feature form from the store
  const editFeatureForm = useAppSelector(
    (state) => state.features.editFeatureForm
  ); //get the edit feature form from the store

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editFeatureForm) {
      //select the feature to edit from the list in the nodes
      const nodeIndex = nodes.findIndex(
        (node) => node.data.id === editFeatureForm.id
      );
      if (nodeIndex !== -1) {
        const updatedNode = {
          ...nodes[nodeIndex],
          data: {
            ...nodes[nodeIndex].data,
            label: editFeatureForm.label,
            description: editFeatureForm.description,
            time: editFeatureForm.time,
            dependencies: editFeatureForm.dependencies,
            customProperties: editFeatureForm.customProperties,
            color: editFeatureForm.color,
          },
        };
        const updatedNodes = [...nodes];
        updatedNodes[nodeIndex] = updatedNode;
        console.log(updatedNodes);
        setNodes(updatedNodes);
      }
    } else if (createFeatureForm) {
      const newCode = Math.random().toString(36).substr(2, 9);
      const newId = `${createFeatureForm.label}-${newCode}`;
      const newNode = {
        id: newId,
        data: {
          id: newId,
          label: createFeatureForm.label,
          description: createFeatureForm.description,
          time: createFeatureForm.time,
          dependencies: createFeatureForm.dependencies,
          customProperties: createFeatureForm.customProperties,
          color: createFeatureForm.color,
        },
        type: "colorNode",
        position: { x: 0, y: 0 },
      };

      console.log("Old nodes",nodes);
      const newNodes = [...nodes];
      console.log("New nodes before",newNodes);

      newNodes.push(newNode);
      console.log("New nodes after",newNodes);

      //setNodes(newNodes);
      dispatch(addNode(newNodes));
    }
    dispatch(handleClear()); //clear the form
  };
  //#region form Inputs Handlers
  const handleEditLabel = (label: string) => {
    if (editFeatureForm) {
      dispatch(setEditFeatureForm({ ...editFeatureForm, label }));
    } else if (createFeatureForm) {
      dispatch(setCreateFeatureForm({ ...createFeatureForm, label }));
    }
  };

  const handleEditDescription = (description: string) => {
    if (editFeatureForm) {
      dispatch(setEditFeatureForm({ ...editFeatureForm, description }));
    } else if (createFeatureForm) {
      dispatch(setCreateFeatureForm({ ...createFeatureForm, description }));
    }
  };

  const handleEditTime = (time: number) => {
    //parse the time to a number

    if (editFeatureForm) {
      dispatch(setEditFeatureForm({ ...editFeatureForm, time }));
    } else if (createFeatureForm) {
      dispatch(setCreateFeatureForm({ ...createFeatureForm, time }));
    }
  };

  const handleEditSection = (section: string) => {
    //parse the time to a number

    if (editFeatureForm) {
      dispatch(setEditFeatureForm({ ...editFeatureForm, section }));
    } else if (createFeatureForm) {
      dispatch(setCreateFeatureForm({ ...createFeatureForm, section }));
    }
  };

  const handleEditDependencies = (dependencies: string[]) => {
    if (editFeatureForm) {
      dispatch(setEditFeatureForm({ ...editFeatureForm, dependencies }));
    } else if (createFeatureForm) {
      dispatch(setCreateFeatureForm({ ...createFeatureForm, dependencies }));
    }
  };
  const handleAddCustomProperty = () => {
    if (editFeatureForm) {
      const customProperties = [...editFeatureForm.customProperties];
      customProperties.push({ key: "", value: "" });
      dispatch(setEditFeatureForm({ ...editFeatureForm, customProperties }));
    } else if (createFeatureForm) {
      const customProperties = [...createFeatureForm.customProperties];
      customProperties.push({ key: "", value: "" });
      dispatch(
        setCreateFeatureForm({ ...createFeatureForm, customProperties })
      );
    }
  };

  const handleCustomPropertyChange = (
    index: number,
    key: string,
    value: string
  ) => {
    if (editFeatureForm) {
      const customProperties = [...editFeatureForm.customProperties];
      customProperties[index] = { key, value };
      dispatch(setEditFeatureForm({ ...editFeatureForm, customProperties }));
    } else if (createFeatureForm) {
      const customProperties = [...createFeatureForm.customProperties];
      customProperties[index] = { key, value };
      dispatch(
        setCreateFeatureForm({ ...createFeatureForm, customProperties })
      );
    }
  };
  //#endregion
  return (
    <div>
      {editFeatureForm || createFeatureForm ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={editFeatureForm?.label || createFeatureForm?.label || ""}
                onChange={(e) => handleEditLabel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>

              <Input
                id="description"
                value={
                  editFeatureForm?.description ||
                  createFeatureForm?.description ||
                  ""
                }
                onChange={(e) => handleEditDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time">Tiempo (horas)</Label>
              <Input
                id="time"
                type="number"
                value={
                  editFeatureForm?.time.toString() ||
                  createFeatureForm?.time.toString() ||
                  ""
                }
                onChange={(e) => handleEditTime(parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="time">Seccion</Label>
              <Input
                id="section"
                value={
                  editFeatureForm?.section ||
                  createFeatureForm?.section ||
                  ""
                }
                onChange={(e) => handleEditSection(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="dependencies">Dependencias</Label>
              <Input
                id="dependencies"
                value={
                  editFeatureForm?.dependencies.join(",") ||
                  createFeatureForm?.dependencies.join(",") ||
                  ""
                }
                onChange={(e) =>
                  handleEditDependencies(e.target.value.split(","))
                }
              />
            </div>
            <div>
              <Label>Propiedades Personalizadas</Label>
              {editFeatureForm?.customProperties.map((prop, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder="Nombre"
                    value={prop.key}
                    onChange={(e) =>
                      handleCustomPropertyChange(
                        index,
                        e.target.value,
                        prop.value
                      )
                    }
                  />
                  <Input
                    placeholder="Valor"
                    value={prop.value}
                    onChange={(e) =>
                      handleCustomPropertyChange(
                        index,
                        prop.key,
                        e.target.value
                      )
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const customProperties = [
                        ...editFeatureForm.customProperties,
                      ];
                      customProperties.splice(index, 1);
                      dispatch(
                        setEditFeatureForm({
                          ...editFeatureForm,
                          customProperties,
                        })
                      );
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )) ||
                createFeatureForm?.customProperties.map((prop, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      placeholder="Nombre"
                      value={prop.key}
                      onChange={(e) =>
                        handleCustomPropertyChange(
                          index,
                          e.target.value,
                          prop.value
                        )
                      }
                    />
                    <Input
                      placeholder="Valor"
                      value={prop.value}
                      onChange={(e) =>
                        handleCustomPropertyChange(
                          index,
                          prop.key,
                          e.target.value
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const customProperties = [
                          ...createFeatureForm.customProperties,
                        ];
                        customProperties.splice(index, 1);
                        dispatch(
                          setCreateFeatureForm({
                            ...createFeatureForm,
                            customProperties,
                          })
                        );
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

              <Button
                type="button"
                variant="outline"
                onClick={handleAddCustomProperty}
                className="mt-2"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Añadir Propiedad
              </Button>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                dispatch(handleClear());
              }}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar Cambios</Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
