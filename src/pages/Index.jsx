import { useState } from "react";
import { Container, VStack, HStack, Input, Button, IconButton, Text, Checkbox, Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([
    { text: "Buy groceries", completed: false },
    { text: "Walk the dog", completed: true },
    { text: "Read a book", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
    setTasks(updatedTasks);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Add a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <Button onClick={addTask} colorScheme="teal">
            Add Task
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} style={{ width: "100%" }}>
                <HStack width="100%" justifyContent="space-between" p={2} borderWidth={1} borderRadius="md">
                  <Checkbox isChecked={task.completed} onChange={() => toggleTaskCompletion(index)}>
                    <Text as={task.completed ? "s" : ""}>{task.text}</Text>
                  </Checkbox>
                  <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => deleteTask(index)} />
                </HStack>
              </motion.div>
            ))}
          </AnimatePresence>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
