import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '../../components/common/SeoHead';
import Container from '../../components/ui/Container';
import FormField from '../../components/ui/FormField';
import { Input, Textarea, Select } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import images from '../../assets/images';
import ImageReveal from '../../components/motion/ImageReveal';
import publicService from '../../services/publicService';
import loadJQueryValidation from '../../utils/jqueryValidation';

const BOOKING_STEPS = [
  {
    number: '01',
    title: 'Calendar & Crew Check',
    detail: 'We confirm equipment and crew availability within one business day.',
  },
  {
    number: '02',
    title: 'Tailored Scope & Proposal',
    detail: 'You receive a clear shot breakdown, deliverables list, and transparent quote.',
  },
  {
    number: '03',
    title: 'Production Lock',
    detail: 'Dates are reserved and your call sheet and pre-production deck begin.',
  },
];

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

  const formRef = useRef(null);
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

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

  const submitBooking = async () => {
    const current = formDataRef.current;
    setFieldErrors({});
    setServerError(null);
    setIsSubmitting(true);

    const payload = {
      name: current.name,
      email: current.email,
      phone: current.phone || null,
      service_id: current.service_id ? Number(current.service_id) : null,
      event_date: current.event_date || null,
      event_location: current.event_location || null,
      message: current.message || null,
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

  const submitRef = useRef(submitBooking);
  submitRef.current = submitBooking;

  useEffect(() => {
    if (isSuccess || !formRef.current) return undefined;

    let isCancelled = false;
    let validatorInstance = null;

    loadJQueryValidation().then(($) => {
      if (isCancelled || !$ || !formRef.current || !$.fn?.validate) return;

      const $form = $(formRef.current);

      validatorInstance = $form.validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
            maxlength: 120,
          },
          email: {
            required: true,
            email: true,
            maxlength: 255,
          },
          phone: {
            phoneFormat: true,
          },
          event_date: {
            futureOrToday: true,
          },
          event_location: {
            maxlength: 255,
          },
          message: {
            required: true,
            minlength: 12,
            maxlength: 5000,
          },
        },
        messages: {
          name: {
            required: 'Please enter your full name.',
            minlength: 'Name must be at least 2 characters.',
          },
          email: {
            required: 'Please enter your email address.',
            email: 'Please enter a valid email address.',
          },
          phone: {
            phoneFormat: 'Please enter a valid phone number (e.g. +256 700 000 000).',
          },
          event_date: {
            futureOrToday: 'Target production date must be today or in the future.',
          },
          message: {
            required: 'Please outline your project scope and deliverables.',
            minlength: 'Please provide at least 12 characters of project detail.',
          },
        },
        onfocusout(element) {
          this.element(element);
        },
        onkeyup(element) {
          if (this.submitted[element.name] || this.invalid[element.name]) {
            this.element(element);
          }
        },
        showErrors(errorMap) {
          const nextErrors = {};
          Object.entries(errorMap).forEach(([fieldName, message]) => {
            nextErrors[fieldName] = [message];
          });
          setFieldErrors((prev) => {
            const updated = { ...prev };
            this.successList.forEach((el) => {
              if (el?.name) delete updated[el.name];
            });
            return { ...updated, ...nextErrors };
          });
        },
        submitHandler() {
          submitRef.current();
          return false;
        },
      });
    });

    return () => {
      isCancelled = true;
      if (validatorInstance) {
        validatorInstance.destroy();
      }
    };
  }, [isSuccess]);

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

      <section className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF]">
        <Container className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
          {/* Masthead */}
          <div
            data-aos="fade-up"
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D5CDC7]"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Reservations &amp; Schedule
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.05] text-[#231815]">
                Book a Production Session
              </h1>
            </div>

            <p className="text-sm text-[#584C46] max-w-sm lg:text-right leading-relaxed">
              Reserve production dates, crew allocation, and calibrated equipment for your upcoming shoot.
            </p>
          </div>

          {/* Wide Production Monitor Still */}
          <div data-aos="fade-up" data-aos-delay="80" className="mt-8 border border-[#E8E3DF] bg-[#231815]">
            <ImageReveal
              src={images.broadcastMonitor.src}
              alt={images.broadcastMonitor.alt}
              className="aspect-[16/9] sm:aspect-[21/7.5] w-full"
              loading="eager"
            />
          </div>

          {/* Unified Overlapping Booking Plate */}
          <div
            data-aos="fade-up"
            data-aos-delay="140"
            className="relative z-10 lg:w-11/12 mx-auto lg:-mt-20 mt-5 grid grid-cols-1 lg:grid-cols-12 border border-[#D5CDC7] bg-white"
          >
            <div className="lg:col-span-4 bg-[#231815] text-[#FAF8F6] p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-6 h-0.5 bg-[#A5BCD6]" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                    How Scheduling Works
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-[#FAF8F6] mb-6">
                  Three Steps to Set
                </h2>

                <div className="divide-y divide-[#3A2B26] border-t border-[#3A2B26]">
                  {BOOKING_STEPS.map((step) => (
                    <div key={step.number} className="py-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A5BCD6] block mb-1">
                        {step.number} &middot; {step.title}
                      </span>
                      <p className="text-xs text-[#C0B7B2] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#3A2B26]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-2">
                  General Question First?
                </span>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#A5BCD6] hover:text-[#FAF8F6] transition-colors"
                >
                  <span>Contact Production Desk</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 p-7 sm:p-10 lg:p-12 bg-white">
              <div className="pb-5 mb-7 border-b border-[#E8E3DF] flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Session Reservation Brief
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                  Kampala &amp; Regional Crew
                </span>
              </div>

              {isSuccess ? (
                <div className="py-12 px-6 text-center max-w-md mx-auto">
                  <div className="w-12 h-12 mx-auto mb-5 bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30 flex items-center justify-center font-bold text-lg rounded-xs">
                    &check;
                  </div>
                  <h3 className="text-xl font-extrabold text-[#231815] mb-2 tracking-tight">
                    Booking Inquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed mb-7">
                    Thank you, {formData.name}. Your production reservation request has been submitted to our scheduling team. We will review our crew calendar and contact you at{' '}
                    <span className="font-semibold text-[#231815]">{formData.email}</span>.
                  </p>
                  <Button variant="secondary" size="sm" onClick={resetForm}>
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  noValidate
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-6"
                >
                  {serverError && (
                    <div className="p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-xs text-xs font-semibold text-[#DC2626]">
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField id="name" label="Full Name" required error={fieldErrors.name?.[0]}>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. David Vance"
                        required
                        error={Boolean(fieldErrors.name)}
                      />
                    </FormField>

                    <FormField id="email" label="Email Address" required error={fieldErrors.email?.[0]}>
                      <Input
                        id="email"
                        name="email"
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
                    <FormField id="phone" label="Phone Number (Optional)" error={fieldErrors.phone?.[0]}>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+256 700 000 000"
                        error={Boolean(fieldErrors.phone)}
                      />
                    </FormField>

                    <FormField id="service_id" label="Production Discipline" error={fieldErrors.service_id?.[0]}>
                      <Select
                        id="service_id"
                        name="service_id"
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
                            <option value="1">Commercial &amp; Editorial Photography</option>
                            <option value="2">Cinematic Videography &amp; Film</option>
                            <option value="3">Milestone Events &amp; Celebration Coverage</option>
                            <option value="4">Aerial &amp; Motion Production</option>
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
                        name="event_date"
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
                        name="event_location"
                        value={formData.event_location}
                        onChange={(e) => setFormData({ ...formData, event_location: e.target.value })}
                        placeholder="e.g. Kampala Studio or On-Location"
                        error={Boolean(fieldErrors.event_location)}
                      />
                    </FormField>
                  </div>

                  <FormField
                    id="message"
                    label="Project Scope & Technical Details"
                    required
                    error={fieldErrors.message?.[0]}
                  >
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline expected deliverables, estimated shoot duration, equipment requests..."
                      required
                      error={Boolean(fieldErrors.message)}
                    />
                  </FormField>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-[11px] text-[#82756E]">
                      No payment required &mdash; we confirm availability first.
                    </span>
                    <Button type="submit" variant="primary" size="md" isLoading={isSubmitting}>
                      Submit Booking Inquiry
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default BookingPage;
