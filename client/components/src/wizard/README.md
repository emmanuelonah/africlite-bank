# Frontend Wizard Design Pattern Documentation

## Introduction

The Frontend Wizard design pattern is a user interface (UI) and user experience (UX) pattern commonly used in web applications to guide users through a multi-step process. This documentation explains the principles, components, and best practices for implementing the Frontend Wizard pattern in your project.

## Table of Contents

- [Key Components](#key-components)
- [Implementation Steps](#implementation-steps)
- [Usage and Examples](#usage-and-examples)
- [Best Practices](#best-practices)
- [Accessibility Considerations](#accessibility-considerations)
- [Troubleshooting](#troubleshooting)
- [Conclusion](#conclusion)

## Key Components

### 1. Wizard Container

The Wizard Container is the top-level component that holds the entire wizard. It manages the overall state of the wizard and coordinates the flow between steps.

### 2. Wizard Steps

Each Wizard Step represents a single section of the multi-step process. These steps contain the content and form elements relevant to the specific step.

### 3. Navigation

Navigation elements, such as "Next," "Previous," and a progress indicator, help users move forward or backward in the wizard.

## Implementation Steps

To implement the Frontend Wizard pattern, follow these steps:

1. Create the Wizard Container.
2. Define individual Wizard Steps.
3. Implement navigation controls (Next, Previous, Progress indicator).
4. Handle data and state management.
5. Customize the look and feel to match your project's design.

## Usage and Examples

### Basic Usage

Here's an example of rendering Wizard:

```tsx
const steps = {
    contact: {
        children: [
            {
                id:1,
                titleId: 'Contact.Email.title',
                subTitleId: 'Contact.Email.subTitle',
                belongsTo:"contact",
                component: <ContactForm />,
                actions: [
                    {
                        appearAs: 'next',
                        behaveAs: 'asyncNext',
                        //destination: '/contact/2',
                        onClick: () => {},
                    },
                    {
                        appearAs: 'skip',
                        behaveAs: 'skip',
                        destination: '/referral/1',
                    },
                ],
                validation: {
                    name: {
                        isRequired: (_target: string, _data: Record<'name', string>) => true,
                        //...otherValidations
                    },
                },
            },
        ],
    },
    referral: {},
};

<Wizard
    baseUrl="/signup"
    titleId="Signup.title"
    cancelReturnTo="/signup"
    initialData={{name:"Emmanuel Onah"}}
    steps={steps}
    onClose={()=>{}}
    onSubmit={()=>{}}
/>
```

## Execution Process

- Destination validation
- UI Render
- Data Validation
- All Proceeding Action(next, submit)
