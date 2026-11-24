import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applicationEmail,
  applicationText,
  emptyApplication,
  validateStep,
} from '../src/website/data/membership.js';
const valid = {
  ...emptyApplication,
  name: 'Adv. Test Member',
  mobile: '+91 98765 43210',
  email: 'test@example.com',
  enrolment: 'TS/1234/2021',
  year: '2021',
  state: 'Telangana',
  district: 'Hyderabad',
  court: 'High Court',
};

test('personal details require a name, valid Indian mobile, and email', () => {
  assert.deepEqual(validateStep(valid, 0), {});
  assert.deepEqual(Object.keys(validateStep(emptyApplication, 0)), ['name', 'mobile', 'email']);
  assert.ok(validateStep({ ...valid, mobile: '1234567890' }, 0).mobile);
  assert.ok(validateStep({ ...valid, email: 'a@b@c.com' }, 0).email);
});
test('enrolment accepts only complete details and a nonfuture integer year', () => {
  assert.deepEqual(validateStep(valid, 1, 2026), {});
  for (const year of ['2027', '1949', '2021.5', ''])
    assert.ok(validateStep({ ...valid, year }, 1, 2026).year);
  assert.ok(validateStep({ ...valid, court: ' ' }, 1, 2026).court);
});
test('email draft preserves special characters and includes every reviewed field', () => {
  const values = { ...valid, name: 'Adv. A & B', address: 'House #12\nStreet & City' };
  const url = new URL(applicationEmail(values));
  assert.equal(url.pathname, 'nationallawyersfederation@gmail.com');
  assert.equal(url.searchParams.get('body'), applicationText(values));
  assert.match(applicationText(values), /House #12\nStreet & City/);
  assert.match(applicationText(values), /Membership tier: Ordinary Member/);
});
