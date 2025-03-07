'use client'
import Avatar from '@/components/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CREATE_CHATBOT } from '@/graphql/mutations/mutations'
import { useMutation } from '@apollo/client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'
import { useState } from 'react'

function CreateChatbot() {

    const { user } = useUser();
    const [name, setName] = useState<string>('');
    const router = useRouter()

    const [createChatbot, { data, loading, error }] = useMutation(
        CREATE_CHATBOT,
        {
            variables: { clerk_user_id: user?.id, name: name, created_at: new Date().toISOString(), },
        }
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const data = await createChatbot()
            setName('')
            router.push(`/edit-chatbot/${data.data.insertChatbots.id}`)
        } catch (e) {
            console.log(e)
        }
    }

    if (!user) {
        return null
    }

    return (
        <div className='flex-col justify-center flex items-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10'>
            <Avatar seed='Support_agent' />
            <div>
                <h1 className='text-xl lg:text-3xl font-semibold'>Create</h1>
                <h2 className='font-light'>Create a new chatbot to assist you in your conversations with your customers.</h2>
                <form className='flex flex-col md:flex-row gap-5 mt-5' onSubmit={(e) => handleSubmit(e)}>
                    <Input value={name} type='text' className='max-w-lg' placeholder='Chatbot Name...' required onChange={(e) => setName(e.target.value)} />
                    <Button type='submit' disabled={loading || !name} className='bg-gray-800 hover:bg-gray-800/40 transition-all duration-200 ease-in-out text-white hover:cursor-pointer'>
                        {loading ? 'Creating Chatbot...' : 'Create Chatbot'}
                    </Button>
                </form>

                <p className='text-gray-300 mt-5'>Example: Customer Support Chatbot</p>
            </div>
        </div>
    )
}

export default CreateChatbot
