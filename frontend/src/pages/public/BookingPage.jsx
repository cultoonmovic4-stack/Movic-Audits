import { useState, useEffect } from 'react';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import { PageHeader } from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import FormField from '../../components/ui/FormField';
import { Input, Textarea, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import publicService from '../../services/publicService';
import Reveal from '../../components/motion/Reveal';

export function BookingPage() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_id: '',
    event_date: '',
    event_location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    publicService.getServices()
      .then((res) => {
        if (isMounted && res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setServices(res.data);
        }
      })
      .catch(() => {
        // Fallback options available in selector if DB empty
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setServerError(null);
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      service_id: formData.service_id ? Number(formData.service_id) : null,
      event_date: formData.event_date || null,
      event_location: formData.event_location || null,
      message: formData.message || null,
    };

    try {
      await publicService.sendBookingRequest(payload);
      setIsSuccess(true);
    } catch (err) {
      if (err.status === 422 && err.errors) {
        setFieldErrors(err.errors);
      } else {
        setServerError(
          err.message || 'An error occurred while submitting your booking request. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service_id: '',
      event_date: '',
      event_location: '',
      message: '',
    });
    setIsSuccess(false);
    setFieldErrors({});
    setServerError(null);
  };

  return (
    <>
      <SeoHead
        title="Book a Production Session"
        description="Reserve production dates, equipment deployment, and creative direction with Movic Audits."
      />

      <Section variant="canvas">
        <Container>
          <Reveal variant="fade-up">
            <PageHeader
              eyebrow="Reservations & Schedule"
              title="Book a Production Session"
              subtitle="Secure production dates and equipment deployment for your campaign, documentary, or commercial project."
            />
          </Reveal>

          <Reveal variant="fade-up" delay={80}>
            <div className="max-w-2xl mx-auto mt-8">
              <div className="bg-white p-8 sm:p-10 border border-[#E8E3DF] rounded-sm shadow-xs">
              {isSuccess ? (
                <div className="py-12 px-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center font-bold text-lg">
                    &check;
                  </div>
                  <h3 className="text-xl font-bold text-[#231815] mb-2">
                    Booking Inquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed mb-6 max-w-md mx-auto">
                    Thank you, {formData.name}. Your production reservation request has been submitted to our scheduling team. We will review our crew calendar and contact you at <span className="font-semibold text-[#231815]">{formData.email}</span>.
                  </p>
                  <Button variant="secondary" size="sm" onClick={resetForm}>
                    Submit Another Request
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
                        placeholder="e.g. David Vance"
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
                        placeholder="david@vance-media.com"
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
                        placeholder="+1 (555) 019-2834"
                        error={Boolean(fieldErrors.phone)}
                      />
                    </FormField>

                    <FormField
                      id="service_id"
                      label="Production Discipline"
                      error={fieldErrors.service_id?.[0]}
                    >
                      <Select
                        id="service_id"
                        value={formData.service_id}
                        onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                        error={Boolean(fieldErrors.service_id)}
                      >
                        <option value="">Select a discipline (optional)</option>
                        {services.length > 0 ? (
                          services.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.title}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="1">Commercial Photography</option>
                            <option value="2">Cinematic Videography & Film</option>
                            <option value="3">Event & Story Coverage</option>
                            <option value="4">Aerial & Motion Production</option>
                          </>
                        )}
                      </Select>
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      id="event_date"
                      label="Target Production Date (Optional)"
                      error={fieldErrors.event_date?.[0]}
                    >
                      <Input
                        id="event_date"
                        type="date"
                        value={formData.event_date}
                        onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                        error={Boolean(fieldErrors.event_date)}
                      />
                    </FormField>

                    <FormField
                      id="event_location"
                      label="Location / Venue (Optional)"
                      error={fieldErrors.event_location?.[0]}
                    >
                      <Input
                        id="event_location"
                        value={formData.event_location}
                        onChange={(e) =>
                          setFormData({ ...formData, event_location: e.target.value })
                        }
                        placeholder="e.g. Studio, City, or On-Location"
                        error={Boolean(fieldErrors.event_location)}
                      />
                    </FormField>
                  </div>

                  <FormField
                    id="message"
                    label="Project Scope & Technical Details"
                    error={fieldErrors.message?.[0]}
                  >
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline expected deliverables, estimated shoot duration, equipment requests..."
                      error={Boolean(fieldErrors.message)}
                    />
                  </FormField>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      Submit Booking Inquiry
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

export default BookingPage;
