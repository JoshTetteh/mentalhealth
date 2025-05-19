import { SignUp } from '@clerk/nextjs';


function SignUp() {
  return (
    <SignUp
      appearance={{
        elements: {
          formField: 'mb-4', // Add some margin to form fields
          footerAction: 'mt-6', // Add margin to the footer actions
        },
      }}
      signUp={{
        fields: [
          {
            label: 'User Type',
            name: 'userType',
            fieldType: 'radio', // Or 'select' for a dropdown
            options: [
              { value: 'patient', label: 'Patient' },
              { value: 'caregiver', label: 'Caregiver' },
              { value: 'admin', label: 'Admin' },
              { value: 'therapist', label: 'Therapist' },
            ],
            required: true,
          },
          // Add other default Clerk fields if you've removed them
          {
            name: 'emailAddress',
            required: true,
          },
          {
            name: 'password',
            required: true,
          },
        ],
        afterSignUpUrl: '/dashboard', // Redirect after sign-up (optional)
      }}
    />
  );
}

export default SignUp;

/**const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
*/