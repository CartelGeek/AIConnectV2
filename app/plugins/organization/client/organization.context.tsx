import { Utility } from '@/core/helpers/utility'
import { Organization, User } from '@prisma/client'
import { useParams } from '@remix-run/react'
import { useEffect } from 'react'
import { Api } from '~/core/trpc'

const getStorageKey = (user: User) => {
  return `organizationId-${user?.id}`
}

const getOrganizationIdStored = (user: User) => {
  const key = getStorageKey(user)
  return typeof window !== 'undefined' ? localStorage.getItem(key) : null
}

const storeOrganizationId = (user: User, organization: Organization) => {
  if (user) {
    const key = getStorageKey(user)
    localStorage.setItem(key, organization.id)
  }
}

const removeOrganizationId = (user: User) => {
  if (user) {
    const key = getStorageKey(user)
    localStorage.removeItem(key)
  }
}

export const useOrganizationContext = (options: { user: User }) => {
  const params = useParams<{ organizationId?: string }>()

  /* --------------------------------- QUERIES -------------------------------- */

  const queryOrganizations = Api.organization.findMany.useQuery(
    {
      where: { roles: { some: { userId: options.user?.id } } },
      orderBy: { name: 'asc' },
    },
    { enabled: false, initialData: [] },
  )

  const organizationId =
    params.organizationId ??
    getOrganizationIdStored(options.user) ??
    queryOrganizations.data?.[0]?.id

  const queryOrganization = Api.organization.findUnique.useQuery(
    {
      where: { id: organizationId },
      include: { roles: { where: { userId: options.user?.id } } },
    },
    {
      enabled: false,
      onSuccess(organization) {
        if (!organization) {
          window.location.replace('/home')
        }
      },
    },
  )

  /* -------------------------------- COMPUTED -------------------------------- */

  const isLoadingOrganization =
    queryOrganization.isLoading ||
    queryOrganization.isRefetching ||
    queryOrganizations.isLoading ||
    queryOrganizations.isRefetching

  const organization = queryOrganization.data
  const organizations = queryOrganizations.data
  const organizationRoles = organization?.roles ?? []

  /* --------------------------------- EFFECTS -------------------------------- */

  useEffect(() => {
    handleRefreshOrganizations()
  }, [options.user?.id])

  useEffect(() => {
    handleRefreshOrganization()
  }, [organizationId, options.user?.id])

  useEffect(() => {
    if (organization?.id) {
      storeOrganizationId(options.user, organization)
    } else {
      removeOrganizationId(options.user)
    }
  }, [organization])

  /* -------------------------------- HANDLERS -------------------------------- */

  const checkOrganizationRole = (roleName: string) => {
    return !!organizationRoles?.find(role => role.name === roleName)
  }

  const handleRefreshOrganizations = async () => {
    const canFetch = Utility.isDefined(options.user?.id)

    if (canFetch) {
      await queryOrganizations.refetch().catch(() => {})
    }
  }

  const handleRefreshOrganization = async () => {
    const canFetch =
      Utility.isDefined(organizationId) && Utility.isDefined(options.user)

    if (canFetch) {
      await queryOrganization.refetch().catch(() => {})
    }
  }

  return {
    isLoadingOrganization,
    organizations,
    organization,
    organizationRoles,
    refetchOrganization: handleRefreshOrganization,
    refetchOrganizations: handleRefreshOrganizations,
    checkOrganizationRole,
  }
}

export type OrganizationContextType = ReturnType<typeof useOrganizationContext>
