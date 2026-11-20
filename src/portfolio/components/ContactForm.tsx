import { FormEvent, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Fields>;
type Status = "idle" | "sending" | "success" | "error";

const initialFields: Fields = { name: "", email: "", message: "" };

export function validateContact(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.name.trim().length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.message.trim()) {
    errors.message = "Please write a message.";
  }
  return errors;
}

const ContactForm = () => {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const updateField = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e5b53d27-3f3b-4946-bae0-3dcb038ba100",
          name: fields.name,
          email: fields.email,
          message: fields.message,
          subject: `Portfolio Contact from ${fields.name}`,
          from_name: "Ezadin Badiru Portfolio",
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("Message failed");
      setFields(initialFields);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <h3>Message sent successfully.</h3>
        <p>Thank you for reaching out. Ezadin will get back to you soon.</p>
        <Button type="button" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-heading">
        <h3>Let’s build something together.</h3>
        <p>Open to remote work, freelance projects, and new opportunities.</p>
      </div>
      <div className="contact-form-fields">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={fields.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <small className="field-error" id="name-error">
              {errors.name}
            </small>
          )}
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <small className="field-error" id="email-error">
              {errors.email}
            </small>
          )}
        </label>
        <label className="contact-message">
          <span>Message</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell me about your project..."
            value={fields.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <small className="field-error" id="message-error">
              {errors.message}
            </small>
          )}
        </label>
      </div>
      <div className="contact-form-footer">
        <p className="contact-form-status" aria-live="polite">
          {status === "error" &&
            "The message could not be sent. Please email ezadinbadru55@gmail.com directly."}
        </p>
        <Button
          className="contact-submit"
          type="submit"
          disabled={status === "sending"}
          data-cursor="disable"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          <MdArrowOutward />
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
