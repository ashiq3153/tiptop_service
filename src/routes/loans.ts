import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateEMI, calculateTotalAmount } from '../utils/calculations';

const router = Router();
const prisma = new PrismaClient();

// Get all loans
router.get('/', async (req, res) => {
  try {
    const loans = await prisma.loan.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

// Get loan by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await prisma.loan.findUnique({
      where: { id }
    });
    
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loan' });
  }
});

// Create new loan application
router.post('/', async (req, res) => {
  try {
    const {
      applicantName,
      applicantEmail,
      applicantPhone,
      loanAmount,
      interestRate,
      loanTerm,
      purpose
    } = req.body;

    // Validate required fields
    if (!applicantName || !applicantEmail || !applicantPhone || !loanAmount || !interestRate || !loanTerm || !purpose) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Calculate EMI and total amount
    const emi = calculateEMI(loanAmount, interestRate, loanTerm);
    const totalAmount = calculateTotalAmount(emi, loanTerm);

    const loan = await prisma.loan.create({
      data: {
        applicantName,
        applicantEmail,
        applicantPhone,
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        loanTerm: parseInt(loanTerm),
        purpose,
        emi,
        totalAmount,
        status: 'PENDING'
      }
    });

    res.status(201).json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ error: 'Failed to create loan application' });
  }
});

// Update loan status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['PENDING', 'APPROVED', 'REJECTED', 'DISBURSED', 'COMPLETED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const loan = await prisma.loan.update({
      where: { id },
      data: { status }
    });

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update loan status' });
  }
});

// Update loan
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      applicantName,
      applicantEmail,
      applicantPhone,
      loanAmount,
      interestRate,
      loanTerm,
      purpose
    } = req.body;

    // Recalculate EMI and total if loan details changed
    const emi = calculateEMI(loanAmount, interestRate, loanTerm);
    const totalAmount = calculateTotalAmount(emi, loanTerm);

    const loan = await prisma.loan.update({
      where: { id },
      data: {
        applicantName,
        applicantEmail,
        applicantPhone,
        loanAmount: parseFloat(loanAmount),
        interestRate: parseFloat(interestRate),
        loanTerm: parseInt(loanTerm),
        purpose,
        emi,
        totalAmount
      }
    });

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update loan' });
  }
});

// Delete loan
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.loan.delete({
      where: { id }
    });
    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete loan' });
  }
});

export default router;
