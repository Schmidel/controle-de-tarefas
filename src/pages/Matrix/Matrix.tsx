import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import "./Matrix.css";
import DialogDemo from "./Dialog/Dialog";
import { TFormSchema } from "./Dialog/FormSchema";
import { CubeIcon } from "@radix-ui/react-icons";

export default function Matrix() {
  const [DoTasks, setDoTasks] = useState<TFormSchema[]>([]);
  const [ScheduleTasks, setScheduleTasks] = useState<TFormSchema[]>([]);
  const [DelegateTasks, setDelegateTasks] = useState<TFormSchema[]>([]);
  const [DeleteTasks, setDeleteTasks] = useState<TFormSchema[]>([]);

  const onSubmit: SubmitHandler<TFormSchema> = (data, e) => {
    data.id = Math.floor(Math.random() * 100000);
    console.log(data.id);
    console.log(data.task);
    console.log(data.description); 
    console.log(data.important);
    console.log(data.urgent);
    if (data.important == true && data.urgent == true) {
      e?.preventDefault();
      e?.stopPropagation();
      setDoTasks((tasks) => [...tasks, data]);
      return false;
    } else if (data.important == true && data.urgent == false) {
      e?.preventDefault();
      e?.stopPropagation();
      setScheduleTasks((tasks) => [...tasks, data]);
      return false;
    } else if (data.important == false && data.urgent == true) {
      e?.preventDefault();
      e?.stopPropagation();
      setDelegateTasks((tasks) => [...tasks, data]);
      return false;
    } else if (data.important == false && data.urgent == false) {
      e?.preventDefault();
      e?.stopPropagation();
      setDeleteTasks((tasks) => [...tasks, data]);
      return false;
    }
  };

  function RemoveTask(id: number, list: number) {
    if (list == 1)
      setDoTasks((current) =>
        current.filter((task) => {
          return task.id !== id;
        })
      );
    else if (list == 2)
      setScheduleTasks((current) =>
        current.filter((task) => {
          return task.id !== id;
        })
      );
    else if (list == 3)
      setDelegateTasks((current) =>
        current.filter((task) => {
          return task.id !== id;
        })
      );
    else if (list == 4)
      setDeleteTasks((current) =>
        current.filter((task) => {
          return task.id !== id;
        })
      );
  }

  return (
    <>
      <div className="wrapper">
        <section className="DoNow">
          <h1>DO NOW</h1>
          <hr />
          {DoTasks.map((task) => (
            <div className="mostrar" key={task.id}>
              <div className="task">
                <h2>{task.task}:</h2> <h3>{task.description}</h3>
              </div>
              <button
                className="Button red"
                onClick={() => RemoveTask(task.id, 1)}
              >
                delete
              </button>
            </div>
          ))}
        </section>

        <section className="Schedule">
          <h1>SCHEDULE</h1>
          <hr />
          {ScheduleTasks.map((task) => (
            <div className="mostrar" key={task.id}>
              <div className="task">
                <h2>{task.task}:</h2> <h3>{task.description}</h3>
              </div>
              <button
                className="Button red"
                onClick={() => RemoveTask(task.id, 2)}
              >
                delete
              </button>
            </div>
          ))}
        </section>

        <section className="Delegate">
          <h1>DELEGATE</h1>
          <hr />
          {DelegateTasks.map((task) => (
            <div className="mostrar" key={task.id}>
              <div className="task">
                <h2>{task.task}:</h2> <h3>{task.description}</h3>
              </div>
              <button
                className="Button red"
                onClick={() => RemoveTask(task.id, 3)}
              >
                delete
              </button>
            </div>
          ))}
        </section>

        <section className="Delete">
          <h1>DELETE</h1>
          <hr />
          {DeleteTasks.map((task) => (
            <div className="mostrar" key={task.id}>
              <div className="task">
                <h2>{task.task}:</h2> <h3>{task.description}</h3>
              </div>
              <button
                className="Button red"
                onClick={() => {
                  RemoveTask(task.id, 4);
                }}
              >
                delete
              </button>
            </div>
          ))}
        </section>
      </div>

      <DialogDemo addTask={onSubmit} />
    </>
  );
}
