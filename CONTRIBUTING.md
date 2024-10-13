  # Contributing to [slack-clone-nextjs]

Thank you for considering contributing to this project! By contributing, you help make this project better, and we appreciate your efforts. These guidelines will help you understand how to get started and how to contribute effectively.

## How to Contribute

1. **Fork the Repository**  
   To start, fork the repository on GitHub by clicking the "Fork" button at the top of the page. This will create a copy of the project under your GitHub account.

2. **Clone Your Fork**  
   Once you’ve forked the repository, clone it to your local machine:
   ```bash
   git clone https://github.com/Diivvuu/slack-clone-nextjs.git
   cd slack-clone-nextjs

3. **Install Dependencies**  
   Install the required dependencies by running:
   ```bash
   npm install
   # or
   yarn install

4. **Create a Branch**  
   To keep your contributions organized, create a new branch for each feature or bug fix. Use a descriptive name that reflects the changes you plan to make. For example:
   ```bash
   git checkout -b feature/add-user-authentication

5. **Make Your Changes**  
   Work on your feature or fix, and ensure that you:
   - Write clear and concise code following the project's coding standards.
   - Ensure that the UI/UX is consistent with the existing design if you're working on the frontend.
   - Test your changes before submitting (see the testing section below).

### Working with shadcn
- When adding or updating components with **shadcn**, ensure you're following the design and structure outlined in the project.
- Reuse components where possible to maintain consistency across the application.

Example of using `shadcn`:
```jsx
import { Button } from 'shadcn-ui';

export default function MyButton() {
  return (
    <Button variant="primary">
      Click Me
    </Button>
  );
}
