export function formatCategoryCode(categoryCode: string): string {
    // Convert to lowercase
    let formattedCode = categoryCode.toLowerCase();
    
    // Replace spaces with dashes
    formattedCode = formattedCode.replace(/\s+/g, '-');
    
    return formattedCode;
  }
  