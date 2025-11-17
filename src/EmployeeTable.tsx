import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from 'mantine-react-table';
import { Box, Button, Flex, Menu, Text, Title } from '@mantine/core';
import { IconUserCircle, IconSend, IconEdit } from '@tabler/icons-react';
import { data, type Employee } from './makeData';
import * as XLSX from 'xlsx';

const EmployeeTable = () => {
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        id: 'employee', // id used to define `group` column
        header: 'Employee',
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, // accessorFn used to join multiple data into a single cell
            id: 'name', // id is still required when using accessorFn instead of accessorKey
            header: 'Name',
            size: 250,
            filterVariant: 'autocomplete',
            Cell: ({ renderedCellValue }) => (
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: 'email', // accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            header: 'Email',
            size: 300,
          },
        ],
      },
      {
        id: 'jobInfo',
        header: 'Job Info',
        columns: [
          {
            accessorKey: 'salary',
            header: 'Salary',
            size: 200,
            filterVariant: 'range-slider',
            mantineFilterRangeSliderProps: {
              color: 'indigo',
              label: (value) =>
                value?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }),
            },
            // custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                style={{
                  backgroundColor:
                    cell.getValue<number>() < 50_000
                      ? '#c92a2a'
                      : cell.getValue<number>() >= 50_000 &&
                        cell.getValue<number>() < 75_000
                      ? '#f59f00'
                      : '#2b8a3e',
                  borderRadius: '4px',
                  color: '#fff',
                  maxWidth: '9ch',
                  padding: '4px',
                }}
              >
                {cell.getValue<number>()?.toLocaleString?.('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: 'jobTitle',
            header: 'Job Title',
            filterVariant: 'multi-select',
            size: 350,
          },
          {
            accessorFn: (row) => {
              // convert to Date for sorting and filtering
              const sDay = new Date(row.startDate);
              sDay.setHours(0, 0, 0, 0); // remove time from date (useful if filter by equals exact date)
              return sDay;
            },
            id: 'startDate',
            header: 'Start Date',
            size: 250,
            filterVariant: 'date-range',
            sortingFn: 'datetime',
            enableColumnFilterModes: false, // keep this as only date-range filter with between inclusive filterFn
            mantineFilterDateInputProps: {
              placeholder: 'Select date',
              valueFormat: 'MM/DD/YYYY',
            },
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), // render Date as a string
          },
        ],
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data, // must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableFacetedValues: true,
    enableGrouping: true,
    enableEditing: true,
    enablePinning: true,
    editDisplayMode: 'table',
    enableRowActions: true,
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    positionActionsColumn: 'last',
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    mantinePaginationProps: {
      radius: 'xl',
      size: 'lg',
    },
    mantineSearchTextInputProps: {
      placeholder: 'Search Employees',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
        }}
      >
        <Box style={{ textAlign: 'center' }}>
          <Title order={3}>Signature Catch Phrase:</Title>
          <Text>&quot;{row.original.signatureCatchPhrase}&quot;</Text>
        </Box>
      </Box>
    ),
    renderRowActionMenuItems: () => (
      <>
        <Menu.Item leftSection={<IconEdit />}>Edit</Menu.Item>
        <Menu.Item leftSection={<IconUserCircle />}>View Profile</Menu.Item>
        <Menu.Item leftSection={<IconSend />}>Send Email</Menu.Item>
      </>
    ),
    renderTopToolbar: ({ table }) => {
      const handleCopySelection = async () => {
        const selectedRows = table.getSelectedRowModel().flatRows;

        if (selectedRows.length === 0) return;

        // Define column headers
        const headers = ['Name', 'Email', 'Salary', 'Job Title', 'Start Date'];

        // Create CSV content
        const csvContent = [
          headers.join('\t'), // Tab-separated headers
          ...selectedRows.map((row) => {
            const employee = row.original;
            return [
              `${employee.firstName} ${employee.lastName}`,
              employee.email,
              employee.salary,
              employee.jobTitle,
              employee.startDate,
            ].join('\t'); // Tab-separated values
          }),
        ].join('\n');

        try {
          // Copy to clipboard
          await navigator.clipboard.writeText(csvContent);
          alert(`Copied ${selectedRows.length} row(s) to clipboard!`);
        } catch (err) {
          console.error('Failed to copy:', err);
          alert('Failed to copy to clipboard');
        }
      };

      const handleActivate = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleExportToExcel = () => {
        // Get all visible rows (respects current filters and sorting)
        const visibleRows = table.getFilteredRowModel().rows;

        // Prepare data for Excel
        const excelData = visibleRows.map((row) => {
          const employee = row.original;
          return {
            Name: `${employee.firstName} ${employee.lastName}`,
            Email: employee.email,
            Salary: employee.salary,
            'Job Title': employee.jobTitle,
            'Start Date': employee.startDate,
            'Signature Catch Phrase': employee.signatureCatchPhrase,
          };
        });

        // Create worksheet from data
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Set column widths for better readability
        worksheet['!cols'] = [
          { wch: 20 }, // Name
          { wch: 30 }, // Email
          { wch: 12 }, // Salary
          { wch: 25 }, // Job Title
          { wch: 15 }, // Start Date
          { wch: 40 }, // Signature Catch Phrase
        ];

        // Create workbook and add worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

        // Generate filename with current date
        const date = new Date().toISOString().split('T')[0];
        const filename = `employees_${date}.xlsx`;

        // Write and download file
        XLSX.writeFile(workbook, filename);
      };

      return (
        <Flex p="md" justify="space-between">
          <Flex gap="xs">
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
          <Flex style={{ gap: '8px' }}>
            <Button
              color="red"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleCopySelection}
              variant="filled"
            >
              Copy Selection
            </Button>
            <Button
              color="green"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleActivate}
              variant="filled"
            >
              Activate
            </Button>
            <Button
              color="blue"
              variant="filled"
            >
              Add
            </Button>
            <Button
              color="blue"
              variant="filled"
              onClick={handleExportToExcel}
            >
              Export
            </Button>
          </Flex>
        </Flex>
      );
    },
  });

  return <MantineReactTable table={table} />;
};

export default EmployeeTable;
