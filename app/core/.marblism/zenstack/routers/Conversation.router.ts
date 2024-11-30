/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.ConversationInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).conversation.createMany(input as any))),

        create: procedure.input($Schema.ConversationInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).conversation.create(input as any))),

        deleteMany: procedure.input($Schema.ConversationInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).conversation.deleteMany(input as any))),

        delete: procedure.input($Schema.ConversationInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).conversation.delete(input as any))),

        findFirst: procedure.input($Schema.ConversationInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).conversation.findFirst(input as any))),

        findMany: procedure.input($Schema.ConversationInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).conversation.findMany(input as any))),

        findUnique: procedure.input($Schema.ConversationInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).conversation.findUnique(input as any))),

        updateMany: procedure.input($Schema.ConversationInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).conversation.updateMany(input as any))),

        update: procedure.input($Schema.ConversationInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).conversation.update(input as any))),

        count: procedure.input($Schema.ConversationInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).conversation.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ConversationCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConversationCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConversationCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConversationCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ConversationCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConversationCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ConversationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ConversationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConversationCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConversationCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ConversationGetPayload<T>, Context>) => Promise<Prisma.ConversationGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ConversationDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConversationDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConversationDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConversationDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ConversationDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConversationDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ConversationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ConversationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConversationDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConversationDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ConversationGetPayload<T>, Context>) => Promise<Prisma.ConversationGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ConversationFindFirstArgs, TData = Prisma.ConversationGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ConversationFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ConversationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ConversationFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ConversationFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ConversationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ConversationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ConversationFindManyArgs, TData = Array<Prisma.ConversationGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ConversationFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ConversationGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ConversationFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ConversationFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ConversationGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ConversationGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ConversationFindUniqueArgs, TData = Prisma.ConversationGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ConversationFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ConversationGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ConversationFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ConversationFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ConversationGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ConversationGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ConversationUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConversationUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConversationUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConversationUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ConversationUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ConversationUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ConversationGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ConversationGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ConversationUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ConversationUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ConversationGetPayload<T>, Context>) => Promise<Prisma.ConversationGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ConversationCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ConversationCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ConversationCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ConversationCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ConversationCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ConversationCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ConversationCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ConversationCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
