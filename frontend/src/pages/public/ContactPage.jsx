import { useState } from 'react';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import FormField from '../../components/ui/FormField';
import { Input, Textarea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import publicService from '../../services/publicService';
import Reveal from '../../components/motion/Reveal';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setServerError(null);
    setIsSubmitting(true);

    try {
      await publicService.sendContactMessage(formData);
      setIsSuccess(true);
    } catch (err) {
      if (err.status === 422 && err.errors) {
        setFieldErrors(err.errors);
      } else {
        setServerError(
          err.message || 'An error occurred while submitting your message. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setIsSuccess(false);
    setFieldErrors({});
    setServerError(null);
  };

  return (
    <>
      <SeoHead
        title="Contact Our Production Desk"
        description="Initiate a general inquiry or discuss an upcoming creative project with Movic Audits."
      />

      <Section variant="canvas">
        <Container>
          <Reveal variant="fade-up">
            <PageHeader
              eyebrow="Direct Correspondence"
              title="Contact Movic Audits"
              subtitle="Reach out to discuss creative collaborations, commercial licensing, or general studio inquiries."
            />
          </Reveal>

          <Reveal variant="fade-up" delay={80}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
              <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 border border-[#E8E3DF] rounded-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#513229] mb-3">
                  Production Studio Base
                </h3>
                <p className="text-xs text-[#584C46] leading-relaxed mb-4">
                  Canonical Workspace:<br />
                  <span className="font-mono text-[#231815]">C:\laragon\www\movic-audits</span>
                </p>
                <p className="text-xs text-[#584C46] leading-relaxed">
                  General Desk:<br />
                  <a
                    href="mailto:info@movicaudits.test"
                    className="font-semibold text-[#513229] hover:underline"
                  >
                    info@movicaudits.test
                  </a>
                </p>
              </div>

              <div className="bg-white p-6 border border-[#E8E3DF] rounded-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#513229] mb-3">
                  Operating Hours
                </h3>
                <p className="text-xs text-[#584C46] leading-relaxed">
                  Monday &ndash; Friday: 08:30 &ndash; 18:00<br />
                  Production Calls: By Prior Schedule
                </p>
              </div>

              <div className="p-6 bg-[#231815] text-[#FAF8F6] rounded-sm border border-[#3A2B26]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#A5BCD6] mb-2">
                  Looking to book a shoot?
                </h3>
                <p className="text-xs text-[#C0B7B2] leading-relaxed mb-4">
                  For service reservations, dates, and dedicated project quotes, visit our booking desk.
                </p>
                <a
                  href="/book"
                  className="text-xs font-bold uppercase tracking-wider text-[#FAF8F6] hover:underline"
                >
                  Go to Booking Form &rarr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white p-8 sm:p-10 border border-[#E8E3DF] rounded-sm shadow-xs">
              {isSuccess ? (
                <div className="py-12 px-6 text-center max-w-md mx-auto">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center font-bold text-lg">
                    &check;
                  </div>
                  <h3 className="text-xl font-bold text-[#231815] mb-2">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed mb-6">
                    Thank you for reaching out. Your inquiry has been received by our production desk, and a representative will follow up with you shortly.
                  </p>
                  <Button variant="secondary" size="sm" onClick={resetForm}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {serverError && (
                    <div className="p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-sm text-xs font-semibold text-[#DC2626]">
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      id="name"
                      label="Full Name"
                      required
                      error={fieldErrors.name?.[0]}
                    >
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Marcus Reid"
                        required
                        error={Boolean(fieldErrors.name)}
                      />
                    </FormField>

                    <FormField
                      id="email"
                      label="Email Address"
                      required
                      error={fieldErrors.email?.[0]}
                    >
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@example.com"
                        required
                        error={Boolean(fieldErrors.email)}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      id="phone"
                      label="Phone Number (Optional)"
                      error={fieldErrors.phone?.[0]}
                    >
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 012-3456"
                        error={Boolean(fieldErrors.phone)}
                      />
                    </FormField>

                    <FormField
                      id="subject"
                      label="Inquiry Subject"
                      required
                      error={fieldErrors.subject?.[0]}
                    >
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Media Production Inquiry"
                        required
                        error={Boolean(fieldErrors.subject)}
                      />
                    </FormField>
                  </div>

                  <FormField
                    id="message"
                    label="Message"
                    required
                    error={fieldErrors.message?.[0]}
                  >
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline the scope of your inquiry, questions, or timeline..."
                      required
                      error={Boolean(fieldErrors.message)}
                    />
                  </FormField>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isSubmitting}
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
        </Container>
      </Section>
    </>
  );
}

export default ContactPage;
