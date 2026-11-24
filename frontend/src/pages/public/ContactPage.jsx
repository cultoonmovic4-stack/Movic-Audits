import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import SeoHead from '../../components/common/SeoHead';
import FormField from '../../components/ui/FormField';
import { Input, Textarea } from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ImageReveal from '../../components/motion/ImageReveal';
import images from '../../assets/images';
import publicService from '../../services/publicService';
import loadJQueryValidation from '../../utils/jqueryValidation';

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

  const formRef = useRef(null);
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  const submitForm = async () => {
    setFieldErrors({});
    setServerError(null);
    setIsSubmitting(true);

    try {
      await publicService.sendContactMessage(formDataRef.current);
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

  const submitRef = useRef(submitForm);
  submitRef.current = submitForm;

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
          subject: {
            required: true,
            minlength: 3,
            maxlength: 200,
          },
          message: {
            required: true,
            minlength: 15,
            maxlength: 5000,
          },
        },
        messages: {
          name: {
            required: 'Please enter your full name.',
            minlength: 'Name must be at least 2 characters.',
            maxlength: 'Name cannot exceed 120 characters.',
          },
          email: {
            required: 'Please enter your email address.',
            email: 'Please enter a valid email address.',
          },
          phone: {
            phoneFormat: 'Please enter a valid phone number (e.g. +256 700 000 000).',
          },
          subject: {
            required: 'Please enter an inquiry subject.',
            minlength: 'Subject must be at least 3 characters.',
          },
          message: {
            required: 'Please share details about your inquiry.',
            minlength: 'Message must be at least 15 characters so our desk can help properly.',
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
          // Sync jQuery Validation errors cleanly into React state (no DOM conflicts)
          const nextErrors = {};
          Object.entries(errorMap).forEach(([fieldName, message]) => {
            nextErrors[fieldName] = [message];
          });
          setFieldErrors((prev) => {
            const updated = { ...prev };
            // Clear resolved fields checked in this pass
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

      {/* Contact Page — Monograph Overlap Desk (Option 04) */}
      <section className="bg-[#FAF8F6] text-[#231815] border-b border-[#E8E3DF]">
        <Container className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
          <div
            data-aos="fade-up"
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#D5CDC7]"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#513229]" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Direct Correspondence
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight leading-[1.05] text-[#231815]">
                Contact Movic Audits
              </h1>
            </div>

            <p className="text-sm text-[#584C46] max-w-sm lg:text-right leading-relaxed">
              Reach out to discuss creative collaborations, commercial licensing, or general studio inquiries.
            </p>
          </div>

          {/* Wide Studio Banner Image */}
          <div data-aos="fade-up" data-aos-delay="80" className="mt-8 border border-[#E8E3DF] bg-[#231815]">
            <ImageReveal
              src={images.vintageCameraTable.src}
              alt={images.vintageCameraTable.alt}
              className="aspect-[16/9] sm:aspect-[21/7.5] w-full"
              loading="eager"
            />
          </div>

          {/* Unified Overlapping Dark + White Correspondence Block */}
          <div
            data-aos="fade-up"
            data-aos-delay="140"
            className="relative z-10 lg:w-11/12 mx-auto lg:-mt-20 mt-5 grid grid-cols-1 lg:grid-cols-12 border border-[#D5CDC7] bg-white"
          >
            {/* Left Dark Production Desk Directory */}
            <div className="lg:col-span-4 bg-[#231815] text-[#FAF8F6] p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-6 h-0.5 bg-[#A5BCD6]" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A5BCD6]">
                    Studio Base
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight text-[#FAF8F6] mb-6">
                  Production Desk
                </h2>

                <div className="space-y-5 text-xs text-[#C0B7B2] border-t border-[#3A2B26] pt-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-[#FAF8F6]">Kampala, Uganda</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                      General Desk
                    </span>
                    <a
                      href="mailto:info@movicaudits.test"
                      className="text-sm font-semibold text-[#A5BCD6] hover:text-white transition-colors"
                    >
                      info@movicaudits.test
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-1">
                      Operating Hours
                    </span>
                    <span className="text-sm font-semibold text-[#FAF8F6] block">
                      Mon &ndash; Fri: 08:30 &ndash; 18:00
                    </span>
                    <span className="text-[11px] text-[#82756E] block mt-0.5">
                      Production Calls by Schedule
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-[#3A2B26]">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#82756E] block mb-2">
                  Planning a Shoot?
                </span>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#A5BCD6] hover:text-[#FAF8F6] transition-colors"
                >
                  <span>Go to Booking Form</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right Direct Message Form (jQuery Validation Enabled) */}
            <div className="lg:col-span-8 p-7 sm:p-10 lg:p-12 bg-white">
              <div className="pb-5 mb-7 border-b border-[#E8E3DF] flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#513229]">
                  Direct Message
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#82756E]">
                  Response Within 24 Hours
                </span>
              </div>

              {isSuccess ? (
                <div className="py-12 px-6 text-center max-w-md mx-auto">
                  <div className="w-12 h-12 mx-auto mb-5 bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30 flex items-center justify-center font-bold text-lg rounded-xs">
                    &check;
                  </div>
                  <h3 className="text-xl font-extrabold text-[#231815] mb-2 tracking-tight">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[#584C46] leading-relaxed mb-7">
                    Thank you for reaching out. Your inquiry has been received by our production desk, and a representative will follow up with you shortly.
                  </p>
                  <Button variant="secondary" size="sm" onClick={resetForm}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  noValidate
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-5"
                >
                  {serverError && (
                    <div className="p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-xs text-xs font-semibold text-[#DC2626]">
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
                        name="name"
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
                        name="email"
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
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+256 700 000 000"
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
                        name="subject"
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
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please outline the scope of your inquiry, questions, or timeline..."
                      required
                      error={Boolean(fieldErrors.message)}
                    />
                  </FormField>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-[11px] text-[#82756E]">
                      We typically reply within one business day.
                    </span>
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
        </Container>
      </section>
    </>
  );
}

export default ContactPage;
