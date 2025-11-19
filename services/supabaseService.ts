import { supabase, supabasePublicClient } from './supabaseClient';
import type { GeneratorOptions, SavedPrompt } from '../types';

/**
 * Adds a prompt to the Supabase database.
 * @param prompt - The generated prompt text.
 * @param options - The options used to generate the prompt.
 * @param userId - The ID of the user saving the prompt.
 */
export const addPrompt = async (prompt: string, options: GeneratorOptions, userId: string): Promise<void> => {
  if (!userId) throw new Error('User must be logged in to add a prompt.');

  const { error } = await supabase
    .from('prompts')
    .insert([{ prompt, options, user_id: userId }]);

  if (error) {
    console.error('Error adding prompt:', error);
    throw new Error('Could not save prompt to the gallery. Please try again.');
  }
};

/**
 * Fetches the most recent prompts for the gallery from Supabase.
 * @returns A promise that resolves to an array of saved prompts.
 */
export const getRecentPrompts = async (): Promise<SavedPrompt[]> => {
  const { data, error } = await supabasePublicClient
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('Error fetching recent prompts:', error);
    throw new Error('Could not load recent prompts.');
  }

  return data || [];
};

/**
 * Fetches a paginated list of all prompts for the full gallery page.
 * @param page - The page number to fetch (1-indexed).
 * @param limit - The number of prompts per page.
 * @returns A promise that resolves to an object containing the prompts and whether there are more pages.
 */
export const getAllPrompts = async (page: number, limit: number): Promise<{ prompts: SavedPrompt[], hasMore: boolean }> => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    const { data, error, count } = await supabasePublicClient
        .from('prompts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(startIndex, endIndex);

    if (error) {
        console.error('Error fetching all prompts:', error);
        throw new Error('Could not load gallery prompts.');
    }
    
    const hasMore = (count || 0) > endIndex + 1;

    return { prompts: data || [], hasMore };
};


/**
 * Fetches all prompts for a specific user from Supabase.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of the user's saved prompts.
 */
export const getUserPrompts = async (userId: string): Promise<SavedPrompt[]> => {
    if (!userId) return [];
    
    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user prompts:', error);
        throw new Error('Could not load your saved prompts.');
    }
    
    return data || [];
};

/**
 * Deletes a specific prompt owned by a user from Supabase.
 * @param promptId - The ID of the prompt to delete.
 * @param userId - The ID of the user who owns the prompt.
 */
export const deletePrompt = async (promptId: number, userId: string): Promise<void> => {
    if (!userId) throw new Error("User must be logged in to delete prompts.");

    const { error } = await supabase
        .from('prompts')
        .delete()
        .match({ id: promptId, user_id: userId });
        
    if (error) {
        console.error('Error deleting prompt:', error);
        throw new Error('Could not delete the prompt.');
    }
};

/**
 * Fetches user's prompt generation stats for rate limiting.
 * @param userId - The ID of the user.
 * @returns An object with the prompt count and the start time of the current batch if a limit is reached.
 */
export const getUserUsageStats = async (userId: string): Promise<{ promptCount: number; lastBatchStartTime: string | null; }> => {
    if (!userId) return { promptCount: 0, lastBatchStartTime: null };
    
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    
    // First, count prompts in the last 2 hours.
    const { count, error: countError } = await supabase
        .from('prompts')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', twoHoursAgo);

    if (countError) {
        console.error('Error counting recent user prompts:', countError);
        return { promptCount: 0, lastBatchStartTime: null };
    }
    
    // If the user has generated 7 or more prompts in the last 2 hours, we need to find the start of that batch.
    if (count !== null && count >= 7) {
         const { data, error: fetchError } = await supabase
            .from('prompts')
            .select('created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(7);
        
        if (fetchError || !data || data.length < 7) {
            console.error('Error fetching user usage stats for cooldown:', fetchError);
            return { promptCount: count, lastBatchStartTime: null };
        }
        
        // The 7th most recent prompt marks the beginning of the cooldown window.
        return { promptCount: count, lastBatchStartTime: data[6].created_at };
    }

    return { promptCount: count || 0, lastBatchStartTime: null };
};