import React, { useState } from 'react';
import { Check, CheckCircle2, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ShoppingItem } from '../../types';

export const CareShopping: React.FC = () => {
  const {
    shoppingList,
    toggleShoppingItem,
    addShoppingItem,
    removeShoppingItem,
    familyMembers,
    showToast,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState<ShoppingItem['category']>('Groceries');
  const [addedBy, setAddedBy] = useState(familyMembers[0]?.name || 'Mom');

  const categories = ['All', 'Groceries', 'Pharmacy', 'Household', 'Care Supplies'];

  const filteredItems = shoppingList.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter an item name', 'error');
      return;
    }

    const newItem: ShoppingItem = {
      id: `shop-${Date.now()}`,
      name: name.trim(),
      quantity: quantity.trim() || '1',
      category,
      purchased: false,
      addedBy,
    };

    addShoppingItem(newItem);
    setName('');
    setQuantity('1');
    setModalOpen(false);
  };

  const handleClearCompleted = () => {
    const completedItems = shoppingList.filter((i) => i.purchased);
    if (completedItems.length === 0) return;
    completedItems.forEach((i) => removeShoppingItem(i.id));
    showToast(`Cleared ${completedItems.length} purchased items`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e7e1d5] pb-6">
        <div>
          <span className="eyebrow text-[#7d8f82]">SHARED PANTRY & SUPPLIES</span>
          <h1 className="serif page-title text-3xl sm:text-4xl text-[#263d35] font-bold mt-1.5">
            The shared shopping list
          </h1>
          <p className="text-xs sm:text-sm text-[#738078] mt-1.5 max-w-xl leading-relaxed">
            Groceries, medication refills, and home essentials. Anyone in your circle can add or check off items in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="soft-button cursor-pointer flex items-center gap-2 rounded-xl bg-[#263d35] text-[#fffdf7] px-4 py-2.5 text-xs font-semibold hover:bg-[#324f44] transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#faf8f1] p-3 rounded-xl border border-[#ede7d8]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-semibold text-[#66776c] mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[#263d35] text-white'
                  : 'text-[#4e6457] hover:bg-[#eae3d2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {shoppingList.some((i) => i.purchased) && (
          <button
            onClick={handleClearCompleted}
            className="text-xs text-[#a06b3a] hover:underline font-medium"
          >
            Clear completed
          </button>
        )}
      </div>

      {/* Item List */}
      <div className="panel p-6 bg-[#fffdf7] border border-[#e7e1d5] rounded-2xl shadow-sm space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-[#8b978f]">
            <ShoppingBag className="h-8 w-8 mx-auto text-[#b2beb6] mb-2" />
            <p className="text-sm font-semibold text-[#486355]">Shopping list is empty</p>
            <p className="text-xs text-[#808f84] mt-0.5">Add an item to keep your pantry and medicine cabinet stocked.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                item.purchased
                  ? 'border-[#ede7d8] bg-[#faf8f1] text-[#939e96]'
                  : 'border-[#e4ded0] bg-[#fffdf8] text-[#263d35] hover:border-[#688b76]'
              }`}
            >
              <div
                onClick={() => toggleShoppingItem(item.id)}
                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    item.purchased
                      ? 'border-[#5e876a] bg-[#5e876a] text-white'
                      : 'border-[#c8c5b6]'
                  }`}
                >
                  {item.purchased && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>

                <div className="min-w-0">
                  <h4
                    className={`text-xs sm:text-sm font-semibold truncate ${
                      item.purchased ? 'line-through text-[#909c93]' : 'text-[#263d35]'
                    }`}
                  >
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-[#78887e]">
                    <span>Qty: {item.quantity}</span>
                    <span>·</span>
                    <span>Added by {item.addedBy || 'Family'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                    item.category === 'Pharmacy'
                      ? 'bg-[#faeed6] text-[#8e6524]'
                      : item.category === 'Groceries'
                      ? 'bg-[#e5f0e4] text-[#3d6543]'
                      : 'bg-[#edeae1] text-[#55695d]'
                  }`}
                >
                  {item.category || 'General'}
                </span>

                <button
                  onClick={() => removeShoppingItem(item.id)}
                  className="text-[#9ea9a2] hover:text-[#b43e38] transition-colors p-1"
                  title="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-[#ded8c9] bg-[#fffdf7] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ede7d8] pb-3 mb-4">
              <h3 className="serif text-lg font-bold text-[#263d35]">Add to Shopping List</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#88968d] hover:text-[#263d35]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Organic Oat Milk, Blood Pressure Pill refills"
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none focus:border-[#527763]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 2 cartons, 1 box"
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#375043] mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as ShoppingItem['category'])
                    }
                    className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                  >
                    <option value="Groceries">Groceries</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Household">Household</option>
                    <option value="Care Supplies">Care Supplies</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#375043] mb-1">
                  Added By
                </label>
                <select
                  value={addedBy}
                  onChange={(e) => setAddedBy(e.target.value)}
                  className="w-full rounded-xl border border-[#ded8c9] bg-white px-3 py-2 text-xs text-[#263d35] focus:outline-none"
                >
                  {familyMembers.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-[#ded8c9] px-4 py-2 text-xs font-medium text-[#5c6e64] hover:bg-[#faf8f1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#263d35] px-4 py-2 text-xs font-semibold text-white hover:bg-[#345145]"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
