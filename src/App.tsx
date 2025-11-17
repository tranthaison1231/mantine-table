import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import EmployeeTable from './EmployeeTable';
import { Container, Title, Space } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: 'en', timezone: 'UTC' }}>
        <Container size="xl" py="xl">
          <Title order={1} ta="center" mb="lg">
            Employee Management System
          </Title>
          <Space h="md" />
          <EmployeeTable />
        </Container>
      </DatesProvider>
    </MantineProvider>
  );
}

export default App;
