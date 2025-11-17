export type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  salary: number;
  startDate: string;
  signatureCatchPhrase: string;
  avatar: string;
};

// Sample data arrays
const firstNames = [
  'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa',
  'William', 'Jennifer', 'James', 'Mary', 'Thomas', 'Patricia', 'Christopher',
  'Linda', 'Daniel', 'Barbara', 'Matthew', 'Elizabeth', 'Anthony', 'Jessica',
  'Mark', 'Susan', 'Donald', 'Karen', 'Steven', 'Nancy', 'Andrew', 'Betty'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White',
  'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'
];

const jobTitles = [
  'Software Engineer',
  'Product Manager',
  'Data Analyst',
  'UX Designer',
  'DevOps Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'QA Engineer',
  'Marketing Manager',
  'Sales Representative',
  'Customer Success Manager',
  'HR Manager',
  'Finance Analyst',
  'Business Analyst',
];

const catchPhrases = [
  'Think outside the box',
  'Synergy is key',
  'Let\'s circle back on that',
  'Low-hanging fruit',
  'Move the needle',
  'Paradigm shift',
  'Game changer',
  'Touch base',
  'Best practice',
  'Win-win situation',
  'Take it to the next level',
  'Deep dive',
  'Disrupt the market',
  'Innovation is everything',
  'Customer-centric approach',
];

// Helper function to generate random date
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split('T')[0];
};

// Helper function to generate random salary
const randomSalary = (): number => {
  return Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000;
};

// Helper function to get random item from array
const randomItem = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Generate employee data
const makeData = (numberOfEmployees: number): Employee[] => {
  const employees: Employee[] = [];
  const startDate = new Date(2015, 0, 1);
  const endDate = new Date();

  for (let i = 0; i < numberOfEmployees; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);

    employees.push({
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      jobTitle: randomItem(jobTitles),
      salary: randomSalary(),
      startDate: randomDate(startDate, endDate),
      signatureCatchPhrase: randomItem(catchPhrases),
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
    });
  }

  return employees;
};

// Export pre-generated data
export const data: Employee[] = makeData(10000);
