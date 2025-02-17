
export const LONG_CONVERSATION = {
    user1: "I'm working on a complex web application and need help deciding on the best state management solution. We're using React with TypeScript, and the app needs to handle real-time data, form state, and cached API responses. What would you recommend?",
    assistant1: `Based on your requirements, I'll break down the best state management solutions for different aspects of your application:

1. For Real-time Data:
- Consider using React Query or SWR
- Benefits: Built-in caching, real-time updates, optimistic updates
- Perfect for API data that needs to stay fresh

2. For Form State:
- React Hook Form or Formik
- Benefits: Performance, validation, TypeScript support
- Handles complex form scenarios efficiently

3. For Global State:
- Zustand or Jotai for simpler apps
- Redux Toolkit for larger, complex applications
- Benefits: TypeScript support, dev tools, middleware

Here's a concrete example combining these:

\`\`\`typescript
// API data with React Query
const { data, isLoading } = useQuery(['users'], fetchUsers);

// Form state with React Hook Form
const { register, handleSubmit } = useForm<UserForm>();

// Global state with Zustand
const useStore = create<AppState>((set) => ({
  theme: 'dark',
  setTheme: (theme) => set({ theme })
}));
\`\`\`

Would you like me to elaborate on any of these solutions?`,
    user2: "That's really helpful! Could you explain more about React Query and how it would handle caching and real-time updates in our case? Also, how would it integrate with the other solutions you mentioned?",
    assistant2: `I'll explain React Query's key features and how it integrates with other solutions:

1. React Query Basics:
\`\`\`typescript
// Basic query
const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
  staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
  cacheTime: 30 * 60 * 1000 // Data cached for 30 minutes
});

// Real-time updates with refetchInterval
const { data } = useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  refetchInterval: 3000 // Refetch every 3 seconds
});

// Mutation with optimistic updates
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['todos']);
    
    // Snapshot previous value
    const previousTodos = queryClient.getQueryData(['todos']);
    
    // Optimistically update
    queryClient.setQueryData(['todos'], old => [...old, newTodo]);
    
    return { previousTodos };
  },
});
\`\`\`

2. Integration with Form State:
\`\`\`typescript
function TodoForm() {
  const { register, handleSubmit } = useForm<TodoForm>();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  const onSubmit = (data: TodoForm) => {
    mutation.mutate(data);
  };
}
\`\`\`

3. Integration with Global State:
\`\`\`typescript
// Zustand store
const useStore = create<AppState>((set) => ({
  filters: { status: 'all' },
  setFilters: (filters) => set({ filters })
}));

// Component using both
function TodoList() {
  const filters = useStore(state => state.filters);
  
  const { data } = useQuery({
    queryKey: ['todos', filters],
    queryFn: () => fetchTodos(filters)
  });
}
\`\`\`

Would you like to see more specific examples or learn about advanced features like infinite queries or parallel queries?`,
    user3: "This is exactly what I needed! One last question: what's the best way to handle error states and loading states across these different solutions? I want to ensure a consistent user experience.",
    assistant3: `Let me show you comprehensive error and loading state handling across the different solutions:

1. Centralized Error Handling:
\`\`\`typescript
// Create a custom error boundary
class AppErrorBoundary extends React.Component<{ fallback: React.ReactNode }> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Custom hook for consistent loading states
function useLoadingState() {
  const queryClient = useQueryClient();
  const mutations = queryClient.getMutationCache().getAll();
  const queries = queryClient.getQueryCache().getAll();
  
  const isLoading = queries.some(query => query.state.status === 'loading')
    || mutations.some(mutation => mutation.state.status === 'loading');
    
  return { isLoading };
}

// Error handling component
function ErrorMessage({ error }: { error: Error }) {
  return (
    <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
      <h4 className="font-medium">Error</h4>
      <p className="text-sm opacity-90">{error.message}</p>
    </div>
  );
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="h-4 bg-muted rounded w-5/6" />
    </div>
  );
}
\`\`\`

2. Implementation in Components:
\`\`\`typescript
function TodoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
  
  const { isLoading: isMutating } = useMutation({
    mutationFn: updateTodo,
  });
  
  if (error) {
    return <ErrorMessage error={error} />;
  }
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  return (
    <div className={cn("relative", isMutating && "opacity-50")}>
      {isMutating && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {/* Todo list content */}
    </div>
  );
}

// Global loading indicator
function GlobalLoadingIndicator() {
  const { isLoading } = useLoadingState();
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1">
      <div className="h-full bg-primary animate-progress" />
    </div>
  );
}
\`\`\`

3. Form Error Handling:
\`\`\`typescript
function TodoForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema)
  });
  
  const mutation = useMutation({
    mutationFn: createTodo,
    onError: (error) => {
      toast.error(error.message);
    }
  });
  
  return (
    <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
      <div className="space-y-4">
        <Input {...register('title')} />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
        
        <Button disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Saving...
            </>
          ) : (
            'Save Todo'
          )}
        </Button>
      </div>
    </form>
  );
}
\`\`\`

This setup provides:
- Consistent error boundaries
- Global loading states
- Form-level validation
- Optimistic updates with fallbacks
- Accessible loading indicators
- Toast notifications for errors

Would you like me to show you how to implement any specific part in more detail?`
};
