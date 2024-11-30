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

        createMany: procedure.input($Schema.TemplateInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).template.createMany(input as any))),

        create: procedure.input($Schema.TemplateInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).template.create(input as any))),

        deleteMany: procedure.input($Schema.TemplateInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).template.deleteMany(input as any))),

        delete: procedure.input($Schema.TemplateInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).template.delete(input as any))),

        findFirst: procedure.input($Schema.TemplateInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).template.findFirst(input as any))),

        findMany: procedure.input($Schema.TemplateInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).template.findMany(input as any))),

        findUnique: procedure.input($Schema.TemplateInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).template.findUnique(input as any))),

        updateMany: procedure.input($Schema.TemplateInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).template.updateMany(input as any))),

        update: procedure.input($Schema.TemplateInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).template.update(input as any))),

        count: procedure.input($Schema.TemplateInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).template.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TemplateCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TemplateCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TemplateCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TemplateCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TemplateCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TemplateCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TemplateCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TemplateCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TemplateGetPayload<T>, Context>) => Promise<Prisma.TemplateGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TemplateDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TemplateDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TemplateDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TemplateDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TemplateDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TemplateDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TemplateDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TemplateDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TemplateGetPayload<T>, Context>) => Promise<Prisma.TemplateGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TemplateFindFirstArgs, TData = Prisma.TemplateGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TemplateFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TemplateFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TemplateFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TemplateFindManyArgs, TData = Array<Prisma.TemplateGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TemplateFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TemplateGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TemplateFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TemplateFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TemplateGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TemplateGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TemplateFindUniqueArgs, TData = Prisma.TemplateGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TemplateFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TemplateFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TemplateFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TemplateUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TemplateUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TemplateUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TemplateUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TemplateUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TemplateUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TemplateUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TemplateUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TemplateGetPayload<T>, Context>) => Promise<Prisma.TemplateGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TemplateCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TemplateCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TemplateCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TemplateCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TemplateCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TemplateCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TemplateCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TemplateCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
