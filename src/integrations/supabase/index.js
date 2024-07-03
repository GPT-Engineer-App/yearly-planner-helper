import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error("Error loading data from Supabase:", error.message);
        throw new Error(error.message);
    }
    return data;
};

// Hooks for event table

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['event', id],
    queryFn: () => fromSupabase(supabase.from('events').select('*').eq('id', id).single()),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
            queryClient.invalidateQueries(['event', updatedEvent.id]);
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('events').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for categories table

export const useCategories = () => useQuery({
    queryKey: ['categories'],
    queryFn: () => fromSupabase(supabase.from('categories').select('*')),
});

export const useCategory = (id) => useQuery({
    queryKey: ['category', id],
    queryFn: () => fromSupabase(supabase.from('categories').select('*').eq('id', id).single()),
});

export const useAddCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCategory) => fromSupabase(supabase.from('categories').insert([newCategory])),
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedCategory) => fromSupabase(supabase.from('categories').update(updatedCategory).eq('id', updatedCategory.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            queryClient.invalidateQueries(['category', updatedCategory.id]);
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('categories').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
        },
    });
};