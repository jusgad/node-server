const {reject} = require('lodash');
const {resolve} = require('path');
const readline = require('readline');

const express = require('express');
const { log } = require('console');
const app = express();
const port = 8000;

app.get('./tasks', (req, res) => {
    res.json(tasks);
});

app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:$(port)');
});

const tasks = [];

// Función para agregar una nueva tarea
function addTask(indicator, description) {
  const task = {
    indicator: indicator,
    description: description,
    status: 'not completado'
  };
  tasks.push(task);
}

// Función para eliminar una tarea
function removeTask(indicator) {
  const index = tasks.findIndex(task => task.indicator === indicator);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

// Función para completar una tarea
function completeTask(indicator) {
  const task = tasks.find(task => task.indicator === indicator);
  if (task) {
    task.status = 'completado';
  }
}

// Función para mostrar todas las tareas
function displayTasks() {
  tasks.forEach(task => {
    console.log(`Indicator: ${task.indicator}`);
    console.log(`Description: ${task.description}`);
    console.log(`Status: ${task.status}`);
    console.log('------------------------');
  });
}

// Crea una interfaz de línea de lectura para la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Solicitar al usuario que elija una función
rl.question('Elija una función: agregar, eliminar, completar, mostrar: ', function (answer) {
  if (answer === 'add') {
    rl.question('Ingrese el indicador de tarea: ', function (indicator) {
      rl.question('Ingrese la descripción de la tarea: ', function (description) {
        addTask(indicator, description);
        displayTasks();
        rl.close();
      });
    });
  } else if (answer === 'remove') {
    rl.question('Ingrese el indicador de tarea a eliminar: ', function (indicator) {
      removeTask(indicator);
      displayTasks();
      rl.close();
    });
  } else if (answer === 'complete') {
    rl.question('Ingrese el indicador de tarea a completar: ', function (indicator) {
      completeTask(indicator);
      displayTasks();
      rl.close();
    });
  } else if (answer === 'display') {
    displayTasks();
    rl.close();
  } else {
    console.log('Elección de función no válida');
    rl.close();
  }
});