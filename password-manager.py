#!/usr/bin/env python3

import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
import sqlite3
import os
import base64
import time
import threading
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import secrets
import sys

class PasswordManager:
    def __init__(self, root):
        # Add at the beginning of __init__ method, before other code
        # Check for reset command
        if len(sys.argv) == 3 and sys.argv[1] == '--reset':
            self.reset_master_password(sys.argv[2])
            sys.exit(0)
            
        self.root = root
        self.root.title("Secure Password Manager")
        self.root.geometry("900x600")
        self.root.resizable(False, False)
        
        # Apply a modern style
        style = ttk.Style()
        style.theme_use('clam')
        
        # Colors
        self.bg_color = "#2E3440"  # Dark blue-gray
        self.accent_color = "#88C0D0"  # Light blue
        self.text_color = "#ECEFF4"  # Almost white
        self.highlight_color = "#5E81AC"  # Medium blue
        self.warning_color = "#BF616A"  # Soft red
        
        # Configure styles
        style.configure("TFrame", background=self.bg_color)
        style.configure("TButton", 
                        background=self.accent_color, 
                        foreground=self.bg_color, 
                        font=("Segoe UI", 11, "bold"), 
                        borderwidth=0,
                        focuscolor=self.highlight_color)
        style.map("TButton", 
                 background=[("active", self.highlight_color)],
                 foreground=[("active", self.text_color)])
        style.configure("TLabel", 
                        background=self.bg_color, 
                        foreground=self.text_color, 
                        font=("Segoe UI", 11))
        style.configure("TEntry", 
                        fieldbackground="#3B4252", 
                        foreground=self.text_color, 
                        insertcolor=self.text_color,
                        font=("Segoe UI", 11))
        style.configure("Header.TLabel", 
                        background=self.bg_color, 
                        foreground=self.accent_color, 
                        font=("Segoe UI", 20, "bold"))
        style.configure("Treeview", 
                        background="#3B4252", 
                        foreground=self.text_color, 
                        fieldbackground="#3B4252",
                        font=("Segoe UI", 10))
        style.map("Treeview", 
                 background=[("selected", self.highlight_color)],
                 foreground=[("selected", self.text_color)])
        style.configure("Treeview.Heading", 
                        background=self.bg_color, 
                        foreground=self.accent_color, 
                        font=("Segoe UI", 11, "bold"))
        
        # Security variables
        self.master_password = None
        self.cipher_suite = None
        self.salt = None
        self.inactivity_timer = None
        self.auto_lock_time = 180  # seconds (3 minutes)
        self.last_activity_time = time.time()
        
        # Database setup
        self.setup_database()
        
        # Define a consistent path for config.dat
        self.config_path = os.path.join(os.path.expanduser("~"), ".password_manager_config.dat")
        
        # Check if first run
        self.first_run = not os.path.exists(self.config_path)
        
        # Create container frames
        self.container = ttk.Frame(root)
        self.container.pack(fill=tk.BOTH, expand=True)
        
        # Show login screen first
        self.show_login_screen()
        
        # Bind activity monitoring
        self.root.bind("<Button-1>", self.reset_inactivity_timer)
        self.root.bind("<Key>", self.reset_inactivity_timer)
        
    def setup_database(self):
        # Use a consistent path for the database
        db_path = os.path.join(os.path.expanduser("~"), "passwords.db")
        self.conn = sqlite3.connect(db_path)
        self.cursor = self.conn.cursor()
        
        # Create tables if they don't exist
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS passwords (
            id INTEGER PRIMARY KEY,
            service_name TEXT NOT NULL,
            email TEXT NOT NULL,
            encrypted_password TEXT NOT NULL
        )
        ''')
        
        self.conn.commit()
    
    def reset_inactivity_timer(self, event=None):
        """Reset the inactivity timer"""
        self.last_activity_time = time.time()
        if self.inactivity_timer:
            self.root.after_cancel(self.inactivity_timer)
        
        if self.master_password:  # Only set timer if logged in
            self.inactivity_timer = self.root.after(1000, self.check_inactivity)
    
    def check_inactivity(self):
        """Check for inactivity and lock if necessary"""
        if time.time() - self.last_activity_time > self.auto_lock_time:
            # Lock the application
            self.lock_application()
            return
        
        # Continue checking
        self.inactivity_timer = self.root.after(1000, self.check_inactivity)
    
    def lock_application(self):
        """Lock the application and return to login screen"""
        if self.inactivity_timer:
            self.root.after_cancel(self.inactivity_timer)
            self.inactivity_timer = None
        
        self.master_password = None
        self.cipher_suite = None
        
        # Clear and show login screen
        for widget in self.container.winfo_children():
            widget.destroy()
        
        self.show_login_screen()
    
    def derive_key(self, password, salt=None):
        """Derive encryption key from password"""
        if salt is None:
            salt = secrets.token_bytes(16)
        
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
        return key, salt
    
    def show_login_screen(self):
        """Display the login screen"""
        self.clear_container()
        
        # Create and center the login frame
        login_frame = ttk.Frame(self.container, style="TFrame")
        login_frame.place(relx=0.5, rely=0.5, anchor="center")
        
        # Logo/Header
        header_label = ttk.Label(login_frame, text="SECURE PASSWORD VAULT", style="Header.TLabel")
        header_label.grid(row=0, column=0, columnspan=2, pady=(0, 40))
        
        # Security icon (represented by text)
        lock_label = ttk.Label(login_frame, text="🔒", font=("Segoe UI", 48), background=self.bg_color, foreground=self.accent_color)
        lock_label.grid(row=1, column=0, columnspan=2, pady=(0, 30))
        
        # Password entry
        password_label = ttk.Label(login_frame, text="Master Password:", style="TLabel")
        password_label.grid(row=2, column=0, sticky="w", padx=5, pady=5)
        
        self.password_entry = ttk.Entry(login_frame, show="●", width=30, style="TEntry")
        self.password_entry.grid(row=2, column=1, padx=5, pady=5)
        self.password_entry.focus_set()
        
        # Instructions for first run
        if self.first_run:
            info_label = ttk.Label(login_frame, 
                                  text="First time setup: Create a strong master password", 
                                  foreground=self.accent_color,
                                  background=self.bg_color,
                                  font=("Segoe UI", 9))
            info_label.grid(row=3, column=0, columnspan=2, pady=(0, 20))
        
        # Login button
        login_button = ttk.Button(login_frame, 
                                 text="Unlock Vault", 
                                 command=self.authenticate,
                                 style="TButton")
        login_button.grid(row=4, column=0, columnspan=2, pady=20)
        
        # Bind Enter key to authenticate
        self.password_entry.bind("<Return>", lambda event: self.authenticate())
        
        # Visual feedback - pulsing effect on the lock icon
        self.pulse_animation(lock_label)
    
    def pulse_animation(self, widget, alpha=1.0, direction=-1):
        """Create a pulsing animation effect"""
        new_alpha = alpha + direction * 0.05
        
        if new_alpha <= 0.5:
            direction = 1
            new_alpha = 0.5
        elif new_alpha >= 1.0:
            direction = -1
            new_alpha = 1.0
            
        # Update color based on alpha
        color_value = int(240 * alpha)
        new_color = f"#{color_value:02x}{color_value:02x}FF"
        widget.configure(foreground=new_color)
        
        # Continue animation
        self.root.after(50, lambda: self.pulse_animation(widget, new_alpha, direction))
    
    def authenticate(self):
        """Authenticate the user with their master password"""
        entered_password = self.password_entry.get()
        
        if not entered_password:
            messagebox.showerror("Error", "Please enter your master password")
            return
        
        if self.first_run:
            # Validate password strength for first time setup
            if len(entered_password) < 8:
                messagebox.showerror("Error", 
                                   "Password must be at least 8 characters long")
                return
            
            if not any(c.isupper() for c in entered_password) or \
               not any(c.islower() for c in entered_password) or \
               not any(c.isdigit() for c in entered_password):
                messagebox.showerror("Error", 
                                   "Password must contain uppercase, lowercase letters and numbers")
                return
            
            # First time setup - confirm password
            confirm = simpledialog.askstring("Confirm Password", 
                                           "Confirm your master password:", 
                                           show="●")
            if confirm != entered_password:
                messagebox.showerror("Error", "Passwords do not match. Please try again.")
                return
            
            try:
                # Create salt and initial key
                self.salt = secrets.token_bytes(16)
                key, _ = self.derive_key(entered_password, self.salt)
                
                # Save salt and key for future verification
                with open(self.config_path, "wb") as f:
                    f.write(self.salt + key)
                
                # Initialize cipher suite
                self.cipher_suite = Fernet(key)
                self.master_password = entered_password
                
                messagebox.showinfo("Success", 
                                  "Master password created successfully!\n\n"
                                  "Please remember this password carefully.\n"
                                  "You can reset it later using:\n"
                                  "python3 password-manager.py --reset <newpasswd>")
                
                self.first_run = False
                self.show_main_screen()
                
            except Exception as e:
                messagebox.showerror("Error", f"Failed to initialize password manager: {str(e)}")
                return
        else:
            try:
                # Load stored salt and key hash
                with open(self.config_path, "rb") as f:
                    data = f.read()
                    stored_salt = data[:16]
                    stored_key = data[16:]
                
                # Derive key from entered password using stored salt
                derived_key, _ = self.derive_key(entered_password, stored_salt)
                
                # Compare derived key with stored key
                if derived_key != stored_key:
                    messagebox.showerror("Error", "Incorrect password")
                    self.password_entry.delete(0, tk.END)
                    return
                
                # Password verified, setup cipher suite
                self.cipher_suite = Fernet(derived_key)
                self.master_password = entered_password
                
                # Visual feedback
                self.password_entry.config(state="disabled")
                unlock_label = ttk.Label(self.container, text="Unlocking vault...", style="TLabel")
                unlock_label.place(relx=0.5, rely=0.65, anchor="center")
                
                # Show main screen after brief delay
                self.root.after(800, lambda: [unlock_label.destroy(), self.show_main_screen()])
                
                # Start inactivity timer
                self.reset_inactivity_timer()
                
            except FileNotFoundError:
                messagebox.showerror("Error", "Configuration file not found. Please reset the application.")
                return
            except Exception as e:
                messagebox.showerror("Error", "Invalid password or corrupted configuration")
                self.password_entry.delete(0, tk.END)
                return
    
    def show_main_screen(self):
        """Display the main password manager screen"""
        self.clear_container()
        
        # Header frame
        header_frame = ttk.Frame(self.container, style="TFrame")
        header_frame.pack(fill=tk.X, padx=20, pady=20)
        
        title_label = ttk.Label(header_frame, text="SECURE PASSWORD VAULT", style="Header.TLabel")
        title_label.pack(side=tk.LEFT)
        
        # Buttons frame
        buttons_frame = ttk.Frame(self.container, style="TFrame")
        buttons_frame.pack(fill=tk.X, padx=20, pady=10)
        
        add_button = ttk.Button(buttons_frame, text="Add New", command=self.add_password)
        add_button.pack(side=tk.LEFT, padx=5)
        
        view_button = ttk.Button(buttons_frame, text="View Password", command=self.view_password)
        view_button.pack(side=tk.LEFT, padx=5)
        
        edit_button = ttk.Button(buttons_frame, text="Edit", command=self.edit_password)
        edit_button.pack(side=tk.LEFT, padx=5)
        
        delete_button = ttk.Button(buttons_frame, text="Delete", command=self.delete_password)
        delete_button.pack(side=tk.LEFT, padx=5)
        
        # Add a spacer
        ttk.Frame(buttons_frame, width=40, style="TFrame").pack(side=tk.LEFT)
        
        # Search frame
        search_frame = ttk.Frame(buttons_frame, style="TFrame")
        search_frame.pack(side=tk.LEFT, fill=tk.X, expand=True)
        
        search_label = ttk.Label(search_frame, text="Search:", style="TLabel")
        search_label.pack(side=tk.LEFT, padx=5)
        
        self.search_var = tk.StringVar()
        self.search_var.trace("w", lambda name, index, mode: self.filter_passwords())
        search_entry = ttk.Entry(search_frame, textvariable=self.search_var, width=20, style="TEntry")
        search_entry.pack(side=tk.LEFT, padx=5)
        
        # Lock button on the right
        lock_button = ttk.Button(buttons_frame, text="Lock Vault", command=self.lock_application)
        lock_button.pack(side=tk.RIGHT, padx=5)
        
        # Treeview for passwords
        self.tree_frame = ttk.Frame(self.container, style="TFrame")
        self.tree_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)
        
        self.tree = ttk.Treeview(self.tree_frame, columns=("ID", "Service", "Email"), show="headings")
        self.tree.heading("ID", text="ID")
        self.tree.heading("Service", text="Service")
        self.tree.heading("Email", text="Email/Username")
        
        self.tree.column("ID", width=50, anchor=tk.CENTER)
        self.tree.column("Service", width=200)
        self.tree.column("Email", width=250)
        
        # Hide the ID column (we'll keep it for reference)
        self.tree.column("ID", width=0, stretch=tk.NO)
        
        # Add scrollbar
        scrollbar = ttk.Scrollbar(self.tree_frame, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscroll=scrollbar.set)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # Status bar
        status_frame = ttk.Frame(self.container, style="TFrame")
        status_frame.pack(fill=tk.X, side=tk.BOTTOM, padx=20, pady=10)
        
        self.status_label = ttk.Label(status_frame, text="Ready", style="TLabel")
        self.status_label.pack(side=tk.LEFT)
        
        # Auto-lock information
        auto_lock_label = ttk.Label(status_frame, 
                                   text=f"Auto-lock after {self.auto_lock_time//60} minutes of inactivity", 
                                   style="TLabel")
        auto_lock_label.pack(side=tk.RIGHT)
        
        # Double click to view password
        self.tree.bind("<Double-1>", lambda event: self.view_password())
        
        # Load passwords
        self.load_passwords()
    
    def clear_container(self):
        """Clear all widgets in the container"""
        for widget in self.container.winfo_children():
            widget.destroy()
    
    def load_passwords(self):
        """Load passwords from database"""
        # Clear existing items
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Get passwords from database
        self.cursor.execute("SELECT id, service_name, email FROM passwords")
        passwords = self.cursor.fetchall()
        
        # Insert into treeview
        for password in passwords:
            self.tree.insert("", tk.END, values=password)
        
        self.status_label.config(text=f"Loaded {len(passwords)} passwords")
    
    def filter_passwords(self):
        """Filter passwords based on search term"""
        search_term = self.search_var.get().lower()
        
        # Clear existing items
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Get passwords from database
        self.cursor.execute("SELECT id, service_name, email FROM passwords")
        passwords = self.cursor.fetchall()
        
        # Filter and insert into treeview
        filtered_count = 0
        for password in passwords:
            if (search_term in password[1].lower() or 
                search_term in password[2].lower()):
                self.tree.insert("", tk.END, values=password)
                filtered_count += 1
        
        self.status_label.config(text=f"Found {filtered_count} matching passwords")
    
    def add_password(self):
        """Add a new password"""
        # Create popup window
        popup = tk.Toplevel(self.root)
        popup.title("Add New Password")
        popup.geometry("400x300")
        popup.resizable(False, False)
        popup.configure(bg=self.bg_color)
        popup.transient(self.root)
        popup.grab_set()
        
        # Center the popup
        popup.geometry("+%d+%d" % (self.root.winfo_x() + 250, self.root.winfo_y() + 150))
        
        # Form fields
        frame = ttk.Frame(popup, style="TFrame")
        frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        ttk.Label(frame, text="Add New Password", style="Header.TLabel").grid(row=0, column=0, columnspan=2, pady=(0, 20))
        
        ttk.Label(frame, text="Service Name:", style="TLabel").grid(row=1, column=0, sticky=tk.W, pady=5)
        service_entry = ttk.Entry(frame, width=30, style="TEntry")
        service_entry.grid(row=1, column=1, pady=5)
        service_entry.focus_set()
        
        ttk.Label(frame, text="Email/Username:", style="TLabel").grid(row=2, column=0, sticky=tk.W, pady=5)
        email_entry = ttk.Entry(frame, width=30, style="TEntry")
        email_entry.grid(row=2, column=1, pady=5)
        
        ttk.Label(frame, text="Password:", style="TLabel").grid(row=3, column=0, sticky=tk.W, pady=5)
        password_entry = ttk.Entry(frame, width=30, show="●", style="TEntry")
        password_entry.grid(row=3, column=1, pady=5)
        
        # Generate password button
        generate_button = ttk.Button(frame, text="Generate Strong Password", command=lambda: self.generate_password(password_entry))
        generate_button.grid(row=4, column=0, columnspan=2, pady=10)
        
        # Save button
        save_button = ttk.Button(frame, text="Save", command=lambda: self.save_password(
            popup, service_entry.get(), email_entry.get(), password_entry.get()))
        save_button.grid(row=5, column=0, columnspan=2, pady=10)
        
        # Cancel button
        cancel_button = ttk.Button(frame, text="Cancel", command=popup.destroy)
        cancel_button.grid(row=6, column=0, columnspan=2, pady=5)
    
    def generate_password(self, entry_widget):
        """Generate a strong random password"""
        # Characters to use in password
        uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ"  # Removed confusing characters
        lowercase = "abcdefghijkmnopqrstuvwxyz"  # Removed confusing characters
        digits = "23456789"  # Removed confusing characters
        symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
        
        # Generate password with at least one of each type
        password = []
        password.append(secrets.choice(uppercase))
        password.append(secrets.choice(lowercase))
        password.append(secrets.choice(digits))
        password.append(secrets.choice(symbols))
        
        # Fill up to 16 characters
        all_chars = uppercase + lowercase + digits + symbols
        password.extend(secrets.choice(all_chars) for _ in range(12))
        
        # Shuffle the password
        secrets.SystemRandom().shuffle(password)
        
        # Set the password in the entry widget
        password_str = ''.join(password)
        entry_widget.delete(0, tk.END)
        entry_widget.insert(0, password_str)
    
    def save_password(self, popup, service, email, password):
        """Save password to database"""
        if not service or not email or not password:
            messagebox.showerror("Error", "All fields are required!")
            return
        
        try:
            # Verify cipher suite is initialized
            if not self.cipher_suite:
                messagebox.showerror("Error", "Session expired. Please log in again.")
                self.lock_application()
                return
                
            # Ensure password is in bytes before encryption
            password_bytes = password.encode('utf-8')
            encrypted_password = self.cipher_suite.encrypt(password_bytes)
            
            # Store as string in database
            encrypted_string = encrypted_password.decode('utf-8')
            
            # Save to database
            self.cursor.execute(
                "INSERT INTO passwords (service_name, email, encrypted_password) VALUES (?, ?, ?)",
                (service, email, encrypted_string)
            )
            self.conn.commit()
            
            # Update the view
            self.load_passwords()
            popup.destroy()
            self.status_label.config(text=f"Added password for {service}")
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save password: {str(e)}")
    
    def view_password(self):
        """View the selected password"""
        # Get selected item
        selected = self.tree.selection()
        if not selected:
            messagebox.showinfo("Info", "Please select a password to view")
            return
        
        # Get password ID
        password_id = self.tree.item(selected[0], "values")[0]
        
        try:
            # Verify cipher suite is initialized
            if not self.cipher_suite:
                messagebox.showerror("Error", "Session expired. Please log in again.")
                self.lock_application()
                return

            # Get encrypted password from database
            self.cursor.execute("SELECT service_name, email, encrypted_password FROM passwords WHERE id = ?", (password_id,))
            result = self.cursor.fetchone()
            
            if not result:
                messagebox.showerror("Error", "Password not found")
                return
            
            service, email, encrypted_password = result
            
            try:
                # Ensure we're working with proper string/bytes encoding
                if isinstance(encrypted_password, str):
                    encrypted_bytes = encrypted_password.encode('utf-8')
                else:
                    encrypted_bytes = encrypted_password
                    
                # Decrypt the password
                decrypted_password = self.cipher_suite.decrypt(encrypted_bytes)
                if isinstance(decrypted_password, bytes):
                    decrypted_password = decrypted_password.decode('utf-8')
                
                # Create and configure popup window for display
                # ... rest of the popup creation code remains the same ...
                
            except Exception as e:
                print(f"DEBUG - Decryption error details: {str(e)}")  # Detailed error for debugging
                print(f"DEBUG - Encrypted password type: {type(encrypted_password)}")
                print(f"DEBUG - Encrypted password: {encrypted_password[:20]}...")  # Show first 20 chars
                messagebox.showerror("Error", 
                                   "Failed to decrypt password. Please try logging out and back in.")
                self.status_label.config(text="Error: Failed to decrypt password")
                return
                
            # Create popup window to display password
            # ... rest of the view_password method remains the same ...
            
        except Exception as e:
            messagebox.showerror("Error", f"Error accessing password: {str(e)}")
            return
    
    def toggle_password_visibility(self, entry_widget, button):
        """Toggle password visibility"""
        if entry_widget.cget("show") == "●":
            entry_widget.config(show="")
            button.config(text="Hide")
        else:
            entry_widget.config(show="●")
            button.config(text="Show")
    
    def copy_to_clipboard(self, text):
        """Copy text to clipboard"""
        self.root.clipboard_clear()
        self.root.clipboard_append(text)
        self.status_label.config(text="Password copied to clipboard (will clear in 10 sec)")
        
        # Clear clipboard after 10 seconds
        self.root.after(10000, lambda: [self.root.clipboard_clear(), 
                                    self.status_label.config(text="Clipboard cleared")])
    
    def edit_password(self):
        """Edit the selected password"""
        # Get selected item
        selected = self.tree.selection()
        if not selected:
            messagebox.showinfo("Info", "Please select a password to edit")
            return
        
        # Get password ID
        password_id = self.tree.item(selected[0], "values")[0]
        
        # Get password from database
        self.cursor.execute("SELECT service_name, email, encrypted_password FROM passwords WHERE id = ?", (password_id,))
        result = self.cursor.fetchone()
        
        if not result:
            messagebox.showerror("Error", "Password not found")
            return
        
        service, email, encrypted_password = result
        
        try:
            # Decrypt password
            decrypted_password = self.cipher_suite.decrypt(encrypted_password.encode()).decode()
            
            # Create popup window
            popup = tk.Toplevel(self.root)
            popup.title("Edit Password")
            popup.geometry("400x300")
            popup.resizable(False, False)
            popup.configure(bg=self.bg_color)
            popup.transient(self.root)
            popup.grab_set()
            
            # Center the popup
            popup.geometry("+%d+%d" % (self.root.winfo_x() + 250, self.root.winfo_y() + 150))
            
            # Form fields
            frame = ttk.Frame(popup, style="TFrame")
            frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
            
            ttk.Label(frame, text="Edit Password", style="Header.TLabel").grid(row=0, column=0, columnspan=2, pady=(0, 20))
            
            ttk.Label(frame, text="Service Name:", style="TLabel").grid(row=1, column=0, sticky=tk.W, pady=5)
            service_entry = ttk.Entry(frame, width=30, style="TEntry")
            service_entry.insert(0, service)
            service_entry.grid(row=1, column=1, pady=5)
            
            ttk.Label(frame, text="Email/Username:", style="TLabel").grid(row=2, column=0, sticky=tk.W, pady=5)
            email_entry = ttk.Entry(frame, width=30, style="TEntry")
            email_entry.insert(0, email)
            email_entry.grid(row=2, column=1, pady=5)
            
            ttk.Label(frame, text="Password:", style="TLabel").grid(row=3, column=0, sticky=tk.W, pady=5)
            password_entry = ttk.Entry(frame, width=30, show="●", style="TEntry")
            password_entry.insert(0, decrypted_password)
            password_entry.grid(row=3, column=1, pady=5)
            
            # Generate password button
            generate_button = ttk.Button(frame, text="Generate Strong Password", 
                                      command=lambda: self.generate_password(password_entry))
            generate_button.grid(row=4, column=0, columnspan=2, pady=10)
            
            # Save button
            save_button = ttk.Button(frame, text="Save Changes", command=lambda: self.update_password(
                popup, password_id, service_entry.get(), email_entry.get(), password_entry.get()))
            save_button.grid(row=5, column=0, columnspan=2, pady=10)
            
            # Cancel button
            cancel_button = ttk.Button(frame, text="Cancel", command=popup.destroy)
            cancel_button.grid(row=6, column=0, columnspan=2, pady=5)
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load password: {str(e)}")
    
    def update_password(self, popup, password_id, service, email, password):
        """Update password in database"""
        # Validate inputs
        if not service or not email or not password:
            messagebox.showerror("Error", "All fields are required!")
            return
        
        try:
            # Encrypt password
            encrypted_password = self.cipher_suite.encrypt(password.encode()).decode()
            
            # Update database
            self.cursor.execute(
                "UPDATE passwords SET service_name = ?, email = ?, encrypted_password = ? WHERE id = ?",
                (service, email, encrypted_password, password_id)
            )
            self.conn.commit()
            
            # Update the view
            self.load_passwords()
            
            # Close popup
            popup.destroy()
            
            # Show success message
            self.status_label.config(text=f"Updated password for {service}")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to update password: {str(e)}")
    
    def delete_password(self):
        """Delete the selected password"""
        # Get selected item
        selected = self.tree.selection()
        if not selected:
            messagebox.showinfo("Info", "Please select a password to delete")
            return
        
        # Get password ID and service name
        values = self.tree.item(selected[0], "values")
        password_id = values[0]
        service = values[1]
        
        # Confirm deletion
        confirm = messagebox.askyesno("Confirm Deletion", 
                                     f"Are you sure you want to delete the password for {service}?")
        if not confirm:
            return
        
        try:
            # Delete from database
            self.cursor.execute("DELETE FROM passwords WHERE id = ?", (password_id,))
            self.conn.commit()
            
            # Update the view
            self.load_passwords()
            
            # Show success message
            self.status_label.config(text=f"Deleted password for {service}")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to delete password: {str(e)}")

    def reset_master_password(self, new_password):
        """Reset the master password and re-encrypt all stored passwords"""
        config_path = os.path.join(os.path.expanduser("~"), ".password_manager_config.dat")
        db_path = os.path.join(os.path.expanduser("~"), "passwords.db")

        # Validate new password strength
        if len(new_password) < 8:
            print("Error: Password must be at least 8 characters long")
            sys.exit(1)
        
        if not any(c.isupper() for c in new_password) or \
           not any(c.islower() for c in new_password) or \
           not any(c.isdigit() for c in new_password):
            print("Error: Password must contain uppercase, lowercase letters and numbers")
            sys.exit(1)

        try:
            # Generate new salt and key
            new_salt = secrets.token_bytes(16)
            new_key, _ = self.derive_key(new_password, new_salt)
            new_cipher = Fernet(new_key)

            # If passwords exist, require old password for migration
            if os.path.exists(config_path) and os.path.exists(db_path):
                conn = sqlite3.connect(db_path)
                cursor = conn.cursor()
                cursor.execute("SELECT COUNT(*) FROM passwords")
                if cursor.fetchone()[0] > 0:
                    old_password = input("Enter current master password to migrate existing passwords: ")
                    try:
                        with open(config_path, "rb") as f:
                            data = f.read()
                            old_salt = data[:16]
                            old_stored_key = data[16:]
                        
                        # Verify old password
                        old_key, _ = self.derive_key(old_password, old_salt)
                        if old_key != old_stored_key:
                            print("Error: Incorrect current password")
                            sys.exit(1)
                        
                        # Re-encrypt all passwords
                        old_cipher = Fernet(old_key)
                        cursor.execute("SELECT id, encrypted_password FROM passwords")
                        for pid, encrypted_pass in cursor.fetchall():
                            try:
                                decrypted = old_cipher.decrypt(encrypted_pass.encode())
                                new_encrypted = new_cipher.encrypt(decrypted)
                                cursor.execute(
                                    "UPDATE passwords SET encrypted_password = ? WHERE id = ?",
                                    (new_encrypted.decode(), pid)
                                )
                            except Exception as e:
                                print(f"Warning: Could not migrate password ID {pid}")
                                continue
                    except Exception as e:
                        print("Error: Failed to verify current password")
                        sys.exit(1)

            # Save new configuration
            with open(config_path, "wb") as f:
                f.write(new_salt + new_key)

            # Commit changes if database exists
            if 'conn' in locals():
                conn.commit()
                conn.close()

            print("Master password has been successfully reset!")
            print("Please restart the application to use the new password.")
            sys.exit(0)

        except Exception as e:
            print(f"Error resetting master password: {str(e)}")
            sys.exit(1)

    def on_closing(self):
        """Handle application closing"""
        # Clean up resources
        if self.conn:
            self.conn.close()
        
        # Clear clipboard for security
        self.root.clipboard_clear()
        
        # Close the application
        self.root.destroy()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if len(sys.argv) == 3 and sys.argv[1] == '--reset':
            PasswordManager(None)
        else:
            print("Usage:")
            print("  Normal start: python3 password-manager.py")
            print("  Reset password: python3 password-manager.py --reset <newpasswd>")
            sys.exit(1)
    else:
        root = tk.Tk()
        app = PasswordManager(root)
        root.protocol("WM_DELETE_WINDOW", app.on_closing)
        root.mainloop()
