"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
  Select,
  Field,
  createListCollection,
  HStack,
  Portal,
  Heading
} from "@chakra-ui/react";

declare global {
  interface Window {
    Telegram: any;
  }
}

export default function Home() {
  const [tg, setTg] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [fee, setFee] = useState("");
  const [deadline, setDeadline] = useState("");
  const isFormValid = title && topic && format && description && budget && fee && deadline;
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.expand();
      setTg(webApp);
    }
  }, []);

  const handleSubmit = () => {
    if (!title || !topic || !format || !description || !budget || !fee || !deadline) {
      alert("Заполните все поля");
      return;
    }

    const formData = {
      title,
      topic,
      format,
      tags,
      description,
      budget,
      fee,
      deadline,
    };

    tg?.sendData(JSON.stringify(formData)); // Отправка данных в Telegram
    alert("Форма отправлена!");
  };

  const formats = createListCollection({
    items: [
      { label: "Все", value: "all" },
      { label: "Лонгрид", value: "longread" },
      { label: "Репортаж", value: "rep" },
      { label: "Расследование", value: "inv" },
    ],
  })

  const tagsList = createListCollection({
    items: [
      { label: "Тег 2", value: "all" },
      { label: "Тег 1", value: "longread" },
      { label: "Тег 3", value: "rep" },
      { label: "Тег 4", value: "inv" },
    ],
  })
  return (
      <Box p={4}>
        <Heading size="xl" mb={2}>Заполните форму</Heading>

        <Box my={2}>
          <Field.Root required>
            <Field.Label>
              Заголовок <Field.RequiredIndicator />
            </Field.Label>
            <Input px={2} placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} mb={2} />
          </Field.Root>

        </Box>

        <Box my={2}>
          <Field.Root required>
            <Field.Label>
              Тема <Field.RequiredIndicator />
            </Field.Label>
            <Input px={2} placeholder="Тема" value={topic} onChange={(e) => setTopic(e.target.value)} mb={2} />
          </Field.Root>
        </Box>

        <Box my={2}>
          <Select.Root collection={formats}>
            <Select.Label>Выберите формат</Select.Label>
            <Select.Control >
              <Select.Trigger p={2} >
                <Select.ValueText placeholder="Выберите формат" mb={2}/>
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {formats.items.map((format) => (
                      <Select.Item item={format} key={format.value}>
                        {format.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Box>


        <Box my={2}>
          <Select.Root collection={tagsList} multiple>
            <Select.Label>Выберите тег</Select.Label>
            <Select.Control>
              <Select.Trigger p={2} >
                <Select.ValueText placeholder="Выберите тег" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {tagsList.items.map((tag) => (
                      <Select.Item item={tag} key={tag.value}>
                        {tag.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Box>

        <Box my={2}>
          <Field.Root required>
            <Field.Label>
              Описание <Field.RequiredIndicator />
            </Field.Label>
            <Textarea p={2}  autoresize placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Field.Root>
        </Box>

        <Box my={2}>
          <Field.Root required>
            <Field.Label>
              Бюджет <Field.RequiredIndicator />
            </Field.Label>
            <Input px={2} type="number" placeholder="Бюджет" value={budget} onChange={(e) => setBudget(e.target.value)} mb={2} />
          </Field.Root>
        </Box>

        <Box my={2}>
          <Field.Root required>
            <Field.Label>
              Гонорар <Field.RequiredIndicator />
            </Field.Label>
            <Input px={2} type="number" placeholder="Гонорар" value={fee} onChange={(e) => setFee(e.target.value)} mb={2} />
          </Field.Root>
        </Box>

        <Box my={2}>
          <Field.Root required>
            <Field.Label>
              Дедлайн первого драфта <Field.RequiredIndicator />
            </Field.Label>
            <Input px={2} type="date" placeholder="Дедлайн первого драфта" value={deadline} onChange={(e) => setDeadline(e.target.value)} mb={2} />
          </Field.Root>
        </Box>



        <Box my={2}>
          <Button
              px={6}
              bg={isFormValid ? "blue.600" : "gray.400"}
              _hover={{ bg: isFormValid ? "blue.700" : "gray.400" }}
              color="white"
              onClick={handleSubmit}
              disabled={!isFormValid}
          >
            Отправить
          </Button>
          <Button px={6} bg="gray.300" _hover={{ bg: "gray.400" }} color="black" ml={2}>
            Отменить
          </Button>
        </Box>
      </Box>
  );
}
