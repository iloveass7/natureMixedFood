import React from 'react';
import { X } from 'lucide-react';

export const SearchSidebar = ({ isOpen, onClose, searchQuery, setSearchQuery, handleSearch }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>      <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-[1.7rem] text-green-700 px-3 font-bold">Search Products</h2>
                                <button
                                    type="button"
                                    className="text-amber-400 hover:text-green-700"
                                    onClick={onClose}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSearch} className="px-3 mt-4 flex">
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-amber-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-amber-400 transition-colors"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Search results will go here */}
                            {searchQuery ? (
                                <div className="space-y-4">
                                    <h3 className="font-medium text-gray-900">Results for "{searchQuery}"</h3>
                                    <div className="space-y-2">
                                        {/* Sample search results - replace with your actual data */}
                                        <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                                            <p className="font-medium">Product 1</p>
                                            <p className="text-sm text-gray-500">Description of product 1</p>
                                        </div>
                                        <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                                            <p className="font-medium">Product 2</p>
                                            <p className="text-sm text-gray-500">Description of product 2</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 justify-center flex items-center h-full">
                                    <p>Enter your search query above</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};