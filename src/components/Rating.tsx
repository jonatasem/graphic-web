export default function RatingComponent({ rating }: { rating: string | number }) {
    const val = typeof rating === 'string' ? parseInt(rating) : rating;
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-[20px] ${i < (val || 0) ? 'text-orange-500' : 'text-[#5c5b5b]'}`}>
                    {i < (val || 0) ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
}
