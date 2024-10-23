import Form from './Form';

function ContactForm() {
    return (
        <Form
            fields={[
                { label: 'imie', signsType: 'text' },
                { label: 'nazwisko', signsType: 'text' },
                { label: 'numer telefonu', signsType: 'number' },
                { label: 'temat' },
                { label: 'wiadomość' },
            ]}
        />
    );
}

export default ContactForm;
