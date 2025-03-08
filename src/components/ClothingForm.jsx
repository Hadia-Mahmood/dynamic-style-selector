
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ClothingForm = () => {
  const [clothingType, setClothingType] = useState();
  const [pantColor, setPantColor] = useState();
  const [shoeType, setShoeType] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate result message
    let resultMessage = '';
    if (clothingType === 'pants') {
      resultMessage = `You selected ${pantColor} pants`;
    } else if (clothingType === 'shoes') {
      resultMessage = `You selected ${shoeType} shoes`;
    }
    
    console.log('Form submitted:', { clothingType, pantColor, shoeType });
    // Display success message
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setClothingType(undefined);
    setPantColor(undefined);
    setShoeType(undefined);
    setIsSubmitted(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-medium">Thank You!</CardTitle>
          <CardDescription>Your selection has been submitted</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-6">
            <p className="text-lg mb-6">
              {clothingType === 'pants' 
                ? `You selected ${pantColor} pants` 
                : `You selected ${shoeType} shoes`}
            </p>
            <Button onClick={resetForm} className="mt-4">Make Another Selection</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">Clothing Selection</CardTitle>
        <CardDescription>Please select your clothing preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label className="text-sm font-medium mb-2 block">
                Select type of clothes
              </label>
              <Select
                value={clothingType}
                onValueChange={(value) => {
                  setClothingType(value);
                  // Reset subsequent selections when clothing type changes
                  setPantColor(undefined);
                  setShoeType(undefined);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select clothing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pants">Pants</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {clothingType === 'pants' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  What pant color?
                </label>
                <Select value={pantColor} onValueChange={setPantColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select pant color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            {clothingType === 'shoes' && (
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="text-sm font-medium mb-2 block">
                  What type of shoes?
                </label>
                <Select value={shoeType} onValueChange={setShoeType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select shoe type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <Button 
                type="submit" 
                className="w-full mt-6"
                disabled={
                  !clothingType || 
                  (clothingType === 'pants' && !pantColor) || 
                  (clothingType === 'shoes' && !shoeType)
                }
              >
                Submit
              </Button>
            </motion.div>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClothingForm;
