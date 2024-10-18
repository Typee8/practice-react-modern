import Form from './Form';

function ContactForm() {
    return (
        <Form
            fields={[
                { label: 'imie', signsType: 'string' },
                { label: 'nazwisko', signsType: 'string' },
                { label: 'numer telefonu', signsType: 'number' },
                { label: 'temat' },
                { label: 'wiadomość' },
            ]}
        />
    );
}

export default ContactForm;
