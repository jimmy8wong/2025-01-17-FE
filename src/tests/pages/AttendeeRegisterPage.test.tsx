import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import AttendeeRegisterPage from '../../pages/AttendeeRegisterPage'

vi.mock('react-router', () => ({
  useParams: () => vi.fn(),
  useNavigate: () => vi.fn(),
}));

describe('Register New Attendee page', () => {
  it('renders the form page', async () => {
    render(<AttendeeRegisterPage />)

    expect((await screen.findByRole('heading', { level: 1 })).textContent).toEqual('Register New Attendee');

    const nameInput = document.querySelector("input#name");
    expect(nameInput).toBeTruthy();

    const emailInput = document.querySelector("input#email");
    expect(emailInput).toBeTruthy();

    expect((await screen.findByRole('button')).textContent).toEqual('Submit');
  })

  it('Renders form errors on empty form submit', async () => {
    render(<AttendeeRegisterPage />)

    const nameErrorMessageElementFalse = document.querySelector("p#name-helper-text");
    expect(nameErrorMessageElementFalse).toBeFalsy();

    const emailErrorMessageElementFalse = document.querySelector("p#email-helper-text");
    expect(emailErrorMessageElementFalse).toBeFalsy();

    await userEvent.click(screen.getByText('Submit'))

    const nameErrorMessageElementTrue = document.querySelector("p#name-helper-text");
    expect(nameErrorMessageElementTrue).toBeTruthy();
    expect((nameErrorMessageElementTrue)?.textContent).toEqual('Name is required');

    const errorErrorMessageElementTrue = document.querySelector("p#email-helper-text");
    expect(errorErrorMessageElementTrue).toBeTruthy();
    expect((errorErrorMessageElementTrue)?.textContent).toEqual('Email is required');
  })
});