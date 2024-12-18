import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/db';
import { Transaction } from '@/lib/models/Transaction';
import type { ITransaction } from '@/lib/models/Transaction';
import type {
  TransactionQuery,
  SortQuery,
  ApiResponse,
  QueryParams,
} from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query params from request
    const searchParams = new URL(request.url).searchParams;
    const params: QueryParams = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      sort: (searchParams.get('sort') as QueryParams['sort']) || 'latest',
    };

    const query: TransactionQuery = {};

    if (params.category) {
      query.category = params.category;
    }

    if (params.search) {
      query.name = { $regex: params.search, $options: 'i' };
    }

    let sortQuery: SortQuery = {};
    switch (params.sort) {
      case 'oldest':
        sortQuery = { date: 1 };
        break;
      case 'a-z':
        sortQuery = { name: 1 };
        break;
      case 'z-a':
        sortQuery = { name: -1 };
        break;
      case 'highest':
        sortQuery = { amount: -1 };
        break;
      case 'lowest':
        sortQuery = { amount: 1 };
        break;
      default:
        sortQuery = { date: -1 }; // latest
    }

    const skip = (params.page - 1) * params.limit;
    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(params.limit);

    const response: ApiResponse<ITransaction[]> = {
      data: transactions,
      pagination: {
        total,
        pages: Math.ceil(total / params.limit),
        currentPage: params.page,
        perPage: params.limit,
      },
    };

    return Response.json(response);
  } catch (error) {
    console.error('Error fetching transactions:', error);

    const errorResponse: ApiResponse<never> = {
      error: 'An error occurred while fetching transactions',
    };

    return Response.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: Omit<ITransaction, '_id' | 'createdAt' | 'updatedAt'> =
      await request.json();

    const transaction = await Transaction.create(body);

    const response: ApiResponse<ITransaction> = {
      data: transaction,
    };

    return Response.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);

    const errorResponse: ApiResponse<never> = {
      error: 'An error occurred while creating a transaction',
    };

    return Response.json(errorResponse, { status: 500 });
  }
}
