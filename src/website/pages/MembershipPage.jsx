import '../home/membership/membership.css';
import { MembershipExtras } from '../components/StandaloneExtras.jsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import PageHeading from '../components/PageHeading.jsx';
import FormField from '../components/FormField.jsx';
import MembershipCard from '../components/MembershipCard.jsx';
import LazyAmbientBg from '../home/shared/LazyAmbientBg.jsx';
import Waves from '../home/shared/Waves.jsx';
import { states } from '../data/states.js';
import {
  applicationEmail,
  applicationRows,
  applicationText,
  emptyApplication,
  membershipTiers,
  validateStep,
} from '../data/membership.js';

export default function MembershipPage({ embedded = false }) {
  const Subheading = embedded ? 'h3' : 'h2';
  const [values, setValues] = useState({ ...emptyApplication });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const form = useRef(null);
  const heading = useRef(null);
  const moved = useRef(false);
  const year = new Date().getFullYear();
  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [step]);
  const update = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };
  const show = (next) => {
    moved.current = true;
    setErrors({});
    setStatus('');
    setStep(next);
  };
  const next = (event) => {
    event.preventDefault();
    if (step >= 3) return;
    const validation = validateStep(values, step);
    setErrors(validation);
    if (Object.keys(validation).length) {
      setStatus('Please check the highlighted details before continuing.');
      requestAnimationFrame(() =>
        form.current.querySelector(`[name="${Object.keys(validation)[0]}"]`)?.focus(),
      );
    } else show(step + 1);
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([applicationText(values)], { type: 'text/plain;charset=utf-8' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NLF-membership-application.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Application downloaded. Attach your Bar Council ID when emailing NLF.');
  };
  const field = (name, label, props = {}) => (
    <FormField
      name={name}
      label={label}
      value={values[name]}
      onChange={update}
      error={errors[name]}
      {...props}
    />
  );
  return (
    <>
      <section id="join" className={`pad route-section${embedded ? ' join-embedded' : ''}`}>
        {embedded && (
          <div className="join-ambient-bg" aria-hidden="true">
            <div className="join-warm-wash" />
            <LazyAmbientBg>
              <Waves
                lightMode
                backgroundColor="transparent"
                lineColor="#cf9032"
                accentColor="#b86b08"
                spacing={36}
                lineWidth={0.8}
                amplitude={16}
                speed={0.45}
                twist={0.8}
                rotation={-6}
                opacity={0.26}
                fade={0.4}
                mouseRadius={135}
              />
            </LazyAmbientBg>
          </div>
        )}
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <PageHeading embedded={embedded}>Join the movement.</PageHeading>
              {embedded && <div className="join-accent-rule" aria-hidden="true" />}
            </div>
            <p className="lede">
              Be part of a collective voice for advocates’ welfare, professional dignity and
              protection. Three short steps; your illustrative NLF card takes shape as you go.
            </p>
          </div>
          <div className="join">
            <form
              ref={form}
              className="formcard rv"
              noValidate
              aria-label="Membership application"
              onSubmit={next}
            >
              <div
                className="steps"
                role="progressbar"
                aria-label="Application progress"
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={step + 1}
                aria-valuetext={step === 3 ? 'Review application' : `Step ${step + 1} of 3`}
              >
                {[0, 1, 2].map((index) => (
                  <i key={index} className={index <= step ? 'done' : ''} />
                ))}
              </div>
              <div key={step} className={`fstep on ${step === 3 ? 'success' : ''}`}>
                <div className="stepno">
                  {step === 3 ? 'Application ready' : `Step ${step + 1} of 3`}
                </div>
                <Subheading ref={heading} tabIndex={-1}>
                  {
                    [
                      'Personal details',
                      'Bar Council verification',
                      'Membership preference',
                      'Send it to NLF',
                    ][step]
                  }
                </Subheading>
                {step === 0 && (
                  <div className="f">
                    {field('name', 'Full name', {
                      required: true,
                      full: true,
                      autoComplete: 'name',
                      placeholder: 'Adv. Your Name',
                    })}
                    {field('mobile', 'Mobile', {
                      required: true,
                      type: 'tel',
                      autoComplete: 'tel',
                      placeholder: '+91 98XXX XXXXX',
                    })}
                    {field('email', 'Email', {
                      required: true,
                      type: 'email',
                      autoComplete: 'email',
                      placeholder: 'you@example.com',
                    })}
                    {field('address', 'Residential address', {
                      multiline: true,
                      full: true,
                      rows: 2,
                      autoComplete: 'street-address',
                      placeholder: 'House no., street, city, PIN',
                    })}
                  </div>
                )}
                {step === 1 && (
                  <div className="f">
                    {field('enrolment', 'Enrolment number', {
                      required: true,
                      placeholder: 'e.g. TS/1234/2021',
                    })}
                    {field('year', 'Year of enrolment', {
                      required: true,
                      type: 'number',
                      min: 1950,
                      max: year,
                      placeholder: '2021',
                    })}
                    {field('state', 'State', {
                      required: true,
                      children: (
                        <>
                          <option value="">Select state or union territory</option>
                          {states.map((state) => (
                            <option key={state}>{state}</option>
                          ))}
                        </>
                      ),
                    })}
                    {field('district', 'District', { required: true, placeholder: 'District' })}
                    {field('court', 'Primary court / Bar unit', {
                      required: true,
                      full: true,
                      placeholder: 'High Court / City Civil Court Bar Association',
                    })}
                    <p className="attachment-note">
                      Attach your Bar Council ID or Certificate of Practice in your email when you
                      send the application.
                    </p>
                  </div>
                )}
                {step === 2 && (
                  <div className="tierpick" aria-label="Membership tiers">
                    {membershipTiers.map(([value, title, description]) => (
                      <button
                        key={value}
                        type="button"
                        className={`tp ${values.tier === value ? 'on' : ''}`}
                        aria-pressed={values.tier === value}
                        onClick={() => update('tier', value)}
                      >
                        <i className="dot" aria-hidden="true" />
                        <span>
                          <b>{title}</b>
                          <span>{description}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                {step === 3 && (
                  <>
                    <p className="review-copy">
                      Review your details below, then open your email app to send the application.
                      Attach your Bar Council ID before sending.
                    </p>
                    <dl className="application-summary">
                      {applicationRows(values).map(([label, value]) => (
                        <Fragment key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </Fragment>
                      ))}
                    </dl>
                    <div className="review-actions">
                      <button className="btn btn-ghost" type="button" onClick={() => show(0)}>
                        Edit details
                      </button>
                      <button className="btn btn-ghost" type="button" onClick={download}>
                        Download application
                      </button>
                    </div>
                    <a className="btn btn-solid" href={applicationEmail(values)}>
                      Open email application
                    </a>
                  </>
                )}
              </div>
              {step < 3 && (
                <div className="nav2">
                  <button
                    type="button"
                    className={`back ${step > 0 ? 'show' : ''}`}
                    onClick={() => show(step - 1)}
                    disabled={step === 0}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-solid">
                    {step === 2 ? 'Review application' : 'Continue'}
                  </button>
                </div>
              )}
              <p className="form-status" role="status" aria-live="polite">
                {status}
              </p>
              <p className="note">
                This page prepares an email application. Nothing is submitted or stored on a server.
                Membership terms, any fee and verification are confirmed by the NLF office.
              </p>
            </form>
            <MembershipCard values={values} />
          </div>
        </div>
      </section>
      {!embedded && <MembershipExtras />}
    </>
  );
}
