# Mantine React Table Demo

A comprehensive demo application showcasing the advanced features of Mantine React Table.

## Features

This demo includes:

- ✅ **Column Grouping** - Organized columns into logical groups (Employee, Job Info)
- ✅ **Custom Cell Rendering** - Avatar images, formatted currency, and conditional styling
- ✅ **Advanced Filtering** - Multiple filter types:
  - Autocomplete for names
  - Range slider for salary
  - Multi-select for job titles
  - Date range for start dates
- ✅ **Row Actions** - Context menu with actions for each employee
- ✅ **Row Selection** - Select multiple rows with bulk actions
- ✅ **Detail Panel** - Expandable rows showing additional information
- ✅ **Custom Toolbar** - Action buttons for selected rows
- ✅ **Global Search** - Search across all fields
- ✅ **Column Ordering** - Drag and drop to reorder columns
- ✅ **Column Pinning** - Pin important columns
- ✅ **Grouping** - Group rows by any column
- ✅ **Pagination** - Navigate through large datasets

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── App.tsx              # Main application component
│   ├── EmployeeTable.tsx    # Advanced table component
│   ├── makeData.ts          # Mock data generator
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # TypeScript declarations
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mantine UI** - Component library
- **Mantine React Table** - Advanced table component
- **Tabler Icons** - Icon library

## Table Features Explained

### Column Grouping
Columns are organized into logical groups (Employee and Job Info) for better organization.

### Custom Cell Rendering
- **Name Column**: Displays avatar image alongside the name
- **Salary Column**: Conditional background colors based on salary range
  - Red: < $50,000
  - Yellow: $50,000 - $75,000
  - Green: > $75,000

### Filtering
- **Name**: Autocomplete filter
- **Salary**: Range slider with min/max values
- **Job Title**: Multi-select dropdown
- **Start Date**: Date range picker

### Row Actions
Right-click or use the actions menu to:
- View employee profile
- Send email

### Bulk Actions
Select multiple rows to:
- Activate selected employees
- Deactivate selected employees
- Contact selected employees

### Detail Panel
Click the expand icon to view:
- Larger avatar image
- Employee's signature catchphrase

## Customization

You can customize the table by modifying [EmployeeTable.tsx](src/EmployeeTable.tsx):

- Add/remove columns
- Change filter types
- Modify cell rendering
- Update styling
- Add new actions

## License

MIT
